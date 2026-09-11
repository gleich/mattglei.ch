---
title: 'lcp: Lightweight Cache & Proxy'
publishedDate: '2025-03-30'
description: 'How lcp, a lightweight cache and proxy written in Go, aggregates and caches API data to power the live sections of mattglei.ch and terminal.mattglei.ch.'
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
  import SystemDiagram from './system-diagram.svelte';
  import CacheOverview from './cache-overview.svelte';

  const { data } = $props();
</script>

<a class="view-on-github" href="https://github.com/gleich/lcp" target="_blank">
  <ViewButton on="GitHub" icon={GithubIcon} />
</a>

<CacheOverview {data} />

<WritingSection title="What is lcp?">

lcp stands for Lightweight Cache & Proxy. It's a backend service I wrote that aggregates,
processes, and caches data from several APIs, then exposes that data through its own REST API.
It's written in the
[Go programming language](https://go.dev) and runs in a Docker container on my
[CapRover server](https://caprover.com). The main goal is to make data fetching for my website
fast and simple. lcp fetches and processes data ahead of time, so the site can read it directly
from memory without waiting for the original APIs. Here's how it works.

</WritingSection>

<WritingSection title="System Overview">

<SystemDiagram />

The diagram above shows how lcp refreshes its caches and serves data to the website. Each cache
uses one of two refresh strategies:

1. Event-based refreshes

   An event, such as an incoming webhook, triggers a refresh. For example,
   [Strava webhooks](https://developers.strava.com/docs/webhooks/) notify lcp about activity
   changes. lcp then fetches data from Strava and Hevy to refresh the combined workouts cache.
   This lets it pick up changes without waiting for the next polling interval.

2. Time-based refreshes

   A background loop refreshes the cache at regular intervals. For example, the Steam cache
   waits 10 minutes between refreshes.

Cache refreshes and HTTP requests run concurrently in Go's goroutines. Each cache uses a
[read/write mutex](https://pkg.go.dev/sync#RWMutex) to coordinate access to its data in memory.
Multiple requests can read the cache at the same time, while an update takes an exclusive lock
to replace the data safely.

When the data changes, lcp also saves a snapshot to disk and sends the updated data to connected
browsers through server-sent events (SSE). The cache's update timestamp records the last change
to its data, so a successful refresh that finds no changes leaves that timestamp unchanged.

</WritingSection>

<WritingSection title="Main Benefits">

1. Fast response times

   When the site requests `lcp.mattglei.ch/workouts`, lcp reads the cached data from memory and
   returns it as JSON. There are no database queries or upstream API requests to wait for.

2. Process and aggregate data ahead of time

   Steam's API returns a player's
   [achievements for one game at a time](https://partner.steamgames.com/doc/webapi/ISteamUserStats#GetPlayerAchievements).
   To show achievement progress alongside a list of games, lcp fetches the games and their
   achievement data, then combines the results. The site can request `lcp.mattglei.ch/steam`
   and get everything it needs in one response. For my site, this reduced more than 25 Steam
   API requests, each taking over 400 ms, to one cached request taking about 200 ms. The upstream
   requests still happen during refreshes, but visitors don't have to wait for them.

3. Reduce the risk of hitting API rate limits

   Most major APIs have rate limits. For example, Strava's default limits for non-upload
   requests are [100 requests every 15 minutes and 1,000 per day](https://developers.strava.com/docs/rate-limits/).
   Fetching data every time someone visited the site could quickly exhaust that allowance.
   With lcp, page views read from the cache, so more visitors don't mean more upstream requests.
   Background refreshes still need to stay within each API's limits.

4. Keep serving data during upstream outages

   If an upstream API is unavailable or a refresh fails, lcp keeps serving the last cached
   snapshot. The data may be out of date until a refresh succeeds, but the site can still display
   it. This depends on lcp remaining available and already having a cached copy of the data.

</WritingSection>

<WritingSection title="Design Decisions">

1. Couldn't this be simpler?

   There are simpler ways to load data onto my website. I built lcp for a few reasons:

   - Keeping data fetching and caching separate from the website lets me change frontend
     frameworks without rebuilding the backend. I like to rebuild my personal website every so
     often to try a new framework, which is how I ended up on version 5. The previous version
     used [Next.js](https://nextjs.org), for example.
   - I want to use this data in other projects, including the
     [SSH version of this website](https://github.com/gleich/terminal). A shared backend gives
     those projects a central place to access the data without depending on the website itself.
   - It had been a while since I'd worked in Go, and I wanted to build another project with it.

2. Why use the Go programming language?

   I've been using Go for a few years and chose it for v2 of lcp for a few reasons:

   - The standard library includes HTTP clients, servers, and JSON encoding, so I can build much
     of the API without third-party packages.
   - I've been very happy with the performance. Serving data from memory keeps request handling
     fast, even though I'm not dealing with massive amounts of traffic.
   - I have a lot of experience writing Go and feel comfortable working in the language.

3. Why is lcp on version 2?

   [v1 of lcp](https://github.com/gleich/lcp-1) was written in
   [Rust](https://www.rust-lang.org). I wanted to rewrite it for a few reasons:

   - I wanted a reusable cache implementation. In v1, much of the code was specific to each
     cache, which led to unnecessary duplication. A generic cache reduced the amount of code
     and made v2 simpler to maintain.
   - I find Go easier to build APIs with. Rust's [Rocket](https://rocket.rs) framework helps, but
     I prefer the simplicity of Go's standard library for this project.
   - v1 used Amazon S3 to store images from Mapbox. I replaced it with a
     [MinIO](https://min.io) instance on my CapRover server to avoid a separate storage bill.
     At the time, MinIO's Go client was stable while its Rust client wasn't, which was another
     reason to switch to Go.

4. Why mix webhooks and polling?

   Webhooks let lcp fetch fresh data in response to a change, which avoids repeatedly checking
   for updates. Not every API provides webhooks for the data I need, though. For example,
   [GitHub's webhook events](https://docs.github.com/en/webhooks/webhook-events-and-payloads)
   don't cover changes to a user's pinned repositories, which power the projects section.
   I use polling for those updates, as well as for Steam games and achievements.

5. Why have a separate endpoint for each cache?

   Each cache has its own data source, refresh logic, and endpoint. This makes the application
   easier to maintain and lets each section of the website load independently.

</WritingSection>

<style>
  .view-on-github {
    display: block;
    text-decoration: inherit;
    margin-bottom: 30px;
  }
</style>
