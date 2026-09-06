---
title: 'lcp: Lightweight Cache & Proxy'
publishedDate: '2025-03-30'
description: 'Technical writeup of a lightweight cache proxy written in Go. Backend service for caching, processing, and aggregating data from APIs like the Strava and GitHub API. Used to power the live data on mattglei.ch and terminal.mattglei.ch'
keywords:
  - Programming
  - Technical
  - Go
readTime: 5
---

<script>
  import GithubIcon from '$lib/icons/github-icon.svelte';
  import ViewButton from '$lib/view-button.svelte';
  import WritingSection from '$lib/writing/writing-section.svelte';
  import { Image } from '@gleich/ui';
  import CacheOverview from './cache-overview.svelte';

  const { data } = $props();
</script>

<a class="view-on-github" href="https://github.com/gleich/lcp" target="_blank">
  <ViewButton on="GitHub" icon={GithubIcon} />
</a>

<CacheOverview {data} />

<WritingSection title="What is lcp?">

lcp is a backend service I wrote that aggregates, processes, and caches data from a number of
APIs. This data is then exposed as a REST API. It's written in the
[Go programming language](https://go.dev) and runs in a Docker container on my
[Caprover server](https://caprover.com). The main goal of lcp is to provide _**extremely fast**_
and very simplified data fetching for my website. This is mainly thanks to the way that caching
is done in a protected memory space and that data is aggregated from multiple sources. Down
below is more technical explanations of how lcp works.

</WritingSection>

<WritingSection title="System Overview">

<Image
  src="/writings/lcp/overview.webp"
  alt="Overview diagram"
  height={2145}
  width={3916}
  placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA1ZJREFUWEeVVwlSG0EMHL3Hm9icxsaEJBRFOP7/HA81o6ulmYUKRbEHu5bU6m7JdNr9qkV/ain9ovKtfsDz9l9/2l4r1E77H/6BU78ZX9QrCglYPA7EsdM5JDsGov8K3nM9XTgCVj0ikVDJIOTi1xFA8BwNur+SBLBaxb8HRwS8JQ6tQi64T+EXJOUlbAbd3zxIw6H/UPXIgxA65oHB5dyCaYHwRrtFx70mAMSzqqH62rEYSYjcm1Q/clbuSJF0PJyE5yP7tXo7hgR6/iPrV1sAhAYU6HC6B+WlikWGYwKpLgv6tQpGBGuhu8ej8kxJwPI711Ib7JhEo+SqDwgeCYHhcfUVAYT2fw7oPV387ZkWnJOQcz2ia5nxfGdCHC0kL3DQ7dNd4ABWXM/sRiEJNIIJ6+cu6PpzuIU+1897sGIMVks9c/UdDUBC6onW29s/94IQFLylO+HVy61LFQJZ9TmJrxCYIeKqs7kSPuLy9caNCBNolQsRCyaB80ID2pFPaDChqH0kA128XZsDKRsNelWCkLHzAdKvqrohkeSWsykrj9Du/QqsmKvWfncETI4gSfx8CK6VByLaBE8zRQqh7celeGyUWwiOnoBywsqVf2s+EHYMt1T6+XEx50CA3xUh8zFi3ILmdqSho4PENK8+0BKwvorUuvQM/uJktIEkoGHVuhisbEMeOBoS/XjfBRlyz5nqMw50T8gcmCXSnzFw+TRP1FoLLW8tARjFID9NxuSYPyBxIGxHnZFCPMsFqhdDouV1GxHAQWQ8UILCTjCRHqsgT8QxKKMhVrz84wR0AZ234PsEenDVYeZBsl9rYy2FlpetXIP+BxRcotZHLLYFbr8ZFZ1BivGMA5tnaYHqNJOw5aVTMWxEsBCJDAP8iIJIjskdRzNtnpQDawgIe5HFaqOCQi89+MAQ3e0/oUCbv1tnFi4fEyRcWa15PnqZe6kN3xoR94WW31vhH0gRrRcSGSYxsJ5J6MQQESoLVJHmB9pNWh4ZgfAFRHdBRAH6JwKKsBOtkhBV5l/5OAVaHkSG+pTa8Tn2Pr6IC6gEBgRMDeiFuhIICRVNWk7zBPoDNprFKJILx75DItGsgTrQZh3HmgDufL4D6nq+9p1QtkAxoTUfyC3w61I+Ab8WmzjyfXXoAAAAAElFTkSuQmCC"
/>

The diagram above illustrates how each cache gets updated. There are two main types of caches here:

1. Event-based cache

   Cache is updated based on an event like receiving a webhook. This is ideal as it provides
   real-time cache updates. An example of this is the Strava cache which receives webhook
   events for new activities.

2. Time-based cache

   Cache is updated based on a given time interval. An example of this is the Steam cache which
   refreshes every 5 minutes.

A **protected memory space** in this context is just a
[mutex lock](<https://en.wikipedia.org/wiki/Lock_(computer_science)>). All of this caching happens
in different threads so to ensure thread-safe memory interactions this protected memory space is used.

</WritingSection>

<WritingSection title="Main Benefits">

1. Fast response times

   When the site makes a request to load data from lcp.mattglei.ch/workouts all it is doing is
   reading the cached data from memory. No expensive database queries or anything.

2. Data can be processed and aggregated

   With Steam, for example, there is no endpoint from the Steam REST API to get your games with
   the achievement data all in one request. So, for every game you need to make a request to
   load the achievement data. All of this is done by lcp so that when a request is made to
   lcp.mattglei.ch/steam it returns the games with their achievements all in one request. This
   cuts down +25 requests to the Steam REST API with each request taking +400ms down to one
   request that takes ~200ms.

3. Prevent hitting API rate limits

   Most major APIs have rate limits. The Strava API for example only allows 100 requests every
   15 minutes. If I wasn't caching this data and was simply requesting the data every time that
   someone visited the site I could very easily encounter rate limiting. The REST API that is
   exposed by lcp has no rate limits, so my site can hit it every time a request is made without
   having to worry about rate limits.

4. Prevent downtime

   Sometimes APIs have problems and are down. Because lcp caches the data and is essentially
   saving a copy, it does't have to depend about the source data being up. Downtime is more often
   than people realize and when you're using multiple APIs, the chance of one of them being down
   is even greater.

</WritingSection>

<WritingSection title="Design Decisions">

1. Couldn't this be simpler?

   There are simpler solutions to purely load data onto my website. Why did I build this then?
   Here are a few reasons why:

   - Data caching and fetching are independent of the framework I am using to build my website.
     This separation of responsibilities is important as every so often I like to rebuild my
     personal website and try out a new framework (hence this being the 5th version of my
     personal website). My last personal website was built in [Next.js](https://nextjs.org) for example.
   - I want to use this data in other projects. For example, I use lcp in the
     [ssh version of this website](https://github.com/gleich/terminal). To have a central place to
     access all of this data instead of everything just getting pulled from my site is better
     architecture in my opinion.
   - It has been a little while since I worked in Go and wanted to do a new project in the language.

2. Why use the Go programming language?

   Go is a popular language for building REST APIs. I've been using the language for a few years
   now and have a few reasons why I selected it for V2 of lcp:

   - The standard library makes it very easy to work with. I don't have to import a bunch of
     different packages for working with things like JSON and requests. A lot of these features
     come straight out of the box with the fantastic standard library.
   - Go is very fast. Although I am not handling massive amounts of web traffic, being able to
     handle a request on the microsecond scale (literally) is great. Very happy with the performance
     I am getting.
   - I have a lot of experience writing Go code and am very comfortable in the language.

3. Why is lcp on version 2?

   [V1 of lcp](https://github.com/gleich/lcp) was written in the
   [Rust programming language](https://www.rust-lang.org). There are a few reasons why I wanted
   to rewrite lcp and create a second version:

   - I wanted to make a more generic cache. In V1 of lcp a lot of the codebase was a cache specific.
     This added a lot of code for each cache with zero benefits. Making a generic cache greatly
     reduced the amount of code/complexity of lcp V2.
   - Go is easier to make APIs with compared to Rust in my opinion. Rust is pretty easy using the
     [rocket.rs](https://rocket.rs) library, but working with the Go standard library makes things simpler.
   - V1 of lcp used AWS S3 which I ended up replacing with a [Minio](https://min.io) instance running
     on my Caprover server. The current Minio library for Rust is not stable, but the one for Go is.
     Switching to Go allows me to use the stable Minio library and cut out using S3. I replaced S3
     with Minio because I didn't want to pay any costs associated with storing images from mapbox.

4. Why mix webhooks and polling?

   Using webhooks is ideal as it only reaches out to API when the data has actually changed.
   Not all APIs or data changes support webhooks which is why polling has to be used instead.
   For the GitHub API, there is no webhook for when the user's pinned repositories are changed
   (which is what the data is based on). For the Steam API, they simply don't support webhooks
   so polling is the only option.

5. Why have separate endpoints instead of bundling them all together in one?

   Having each cache be independent of each other provides a separation of concerns which makes
   the application easier to maintain/work with. It also allows each section to load independently
   on the front end.

</WritingSection>

<style>
  .view-on-github {
    display: block;
    text-decoration: inherit;
    margin-bottom: 30px;
  }
</style>
