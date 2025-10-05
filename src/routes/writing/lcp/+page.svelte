<script lang="ts">
	import GithubIcon from '$lib/icons/github-icon.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import WritingSection from '$lib/writing/writing-section.svelte';
	import Writing from '$lib/writing/writing.svelte';
	import { Image } from '@gleich/ui';
	import writings from '../writings';
	import type { LCPData } from './+page.server';
	import CacheStatus from './cache-status.svelte';

	const { data }: { data: LCPData } = $props();
</script>

<Writing writing={writings.get('lcp')!}>
	<a class="view-on-github" href="https://github.com/gleich/lcp" target="_blank">
		<ViewButton on="GitHub" icon={GithubIcon} />
	</a>

	<WritingSection title="Cache Status Overview">
		<div class="statuses">
			{#await data.projects}
				<CacheStatus name="Projects" loading />
			{:then projects}
				<CacheStatus
					name="Projects"
					updated={projects?.updated}
					updateFrequency="Refreshing every 30 seconds"
				/>
			{/await}
			{#await data.workouts}
				<CacheStatus name="Workouts" loading />
			{:then workouts}
				<CacheStatus
					name="Workouts"
					updated={workouts?.updated}
					updateFrequency="Refreshing when data changes"
				/>
			{/await}
			{#await data.music}
				<CacheStatus name="Music" loading />
			{:then music}
				<CacheStatus
					name="Music"
					updated={music?.updated}
					updateFrequency="Refreshing every 20 seconds"
				/>
			{/await}
			{#await data.games}
				<CacheStatus name="Games" loading />
			{:then games}
				<CacheStatus
					name="Games"
					updated={games?.updated}
					updateFrequency="Refreshing every 10 minutes"
				/>
			{/await}
		</div>
	</WritingSection>

	<WritingSection title="What is lcp?">
		<p>
			lcp is a backend service I wrote that aggregates, processes, and caches data from a number of
			APIs. This data is then exposed as a REST API. It's written in the <a
				href="https://go.dev"
				target="_blank">Go programming language</a
			>
			and runs in a Docker container on my
			<a href="https://caprover.com" target="_blank">Caprover server</a>. The main goal of lcp is to
			provide <i><b>extremely fast</b></i> and very simplified data fetching for my website. This is
			mainly thanks to the way that caching is done in a protected memory space and that data is aggregated
			from multiple sources. Down below is more technical explanations of how lcp works.
		</p>
	</WritingSection>

	<WritingSection title="System Overview">
		<div class="overview-diagram">
			<Image
				src="/writings/lcp/overview.webp"
				alt="Overview diagram"
				height={2145}
				width={3916}
				placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA1ZJREFUWEeVVwlSG0EMHL3Hm9icxsaEJBRFOP7/HA81o6ulmYUKRbEHu5bU6m7JdNr9qkV/ain9ovKtfsDz9l9/2l4r1E77H/6BU78ZX9QrCglYPA7EsdM5JDsGov8K3nM9XTgCVj0ikVDJIOTi1xFA8BwNur+SBLBaxb8HRwS8JQ6tQi64T+EXJOUlbAbd3zxIw6H/UPXIgxA65oHB5dyCaYHwRrtFx70mAMSzqqH62rEYSYjcm1Q/clbuSJF0PJyE5yP7tXo7hgR6/iPrV1sAhAYU6HC6B+WlikWGYwKpLgv6tQpGBGuhu8ej8kxJwPI711Ib7JhEo+SqDwgeCYHhcfUVAYT2fw7oPV387ZkWnJOQcz2ia5nxfGdCHC0kL3DQ7dNd4ABWXM/sRiEJNIIJ6+cu6PpzuIU+1897sGIMVks9c/UdDUBC6onW29s/94IQFLylO+HVy61LFQJZ9TmJrxCYIeKqs7kSPuLy9caNCBNolQsRCyaB80ID2pFPaDChqH0kA128XZsDKRsNelWCkLHzAdKvqrohkeSWsykrj9Du/QqsmKvWfncETI4gSfx8CK6VByLaBE8zRQqh7celeGyUWwiOnoBywsqVf2s+EHYMt1T6+XEx50CA3xUh8zFi3ILmdqSho4PENK8+0BKwvorUuvQM/uJktIEkoGHVuhisbEMeOBoS/XjfBRlyz5nqMw50T8gcmCXSnzFw+TRP1FoLLW8tARjFID9NxuSYPyBxIGxHnZFCPMsFqhdDouV1GxHAQWQ8UILCTjCRHqsgT8QxKKMhVrz84wR0AZ234PsEenDVYeZBsl9rYy2FlpetXIP+BxRcotZHLLYFbr8ZFZ1BivGMA5tnaYHqNJOw5aVTMWxEsBCJDAP8iIJIjskdRzNtnpQDawgIe5HFaqOCQi89+MAQ3e0/oUCbv1tnFi4fEyRcWa15PnqZe6kN3xoR94WW31vhH0gRrRcSGSYxsJ5J6MQQESoLVJHmB9pNWh4ZgfAFRHdBRAH6JwKKsBOtkhBV5l/5OAVaHkSG+pTa8Tn2Pr6IC6gEBgRMDeiFuhIICRVNWk7zBPoDNprFKJILx75DItGsgTrQZh3HmgDufL4D6nq+9p1QtkAxoTUfyC3w61I+Ab8WmzjyfXXoAAAAAElFTkSuQmCC"
			/>
		</div>
		<p>
			The diagram above illustrates how each cache gets updated. There are two main types of caches
			here:
		</p>
		<ol>
			<li>Event-based cache</li>
			<p>
				Cache is updated based on an event like receiving a webhook. This is ideal as it provides
				real-time cache updates. An example of this is the Strava cache which receives webhook
				events for new activities.
			</p>
			<li>Time-based cache</li>
			<p>
				Cache is updated based on a given time interval. An example of this is the Steam cache which
				refreshes every 5 minutes.
			</p>
		</ol>
		<p>
			A <b>protected memory space</b> in this context is just a
			<a href="https://en.wikipedia.org/wiki/Lock_(computer_science)" target="_blank">mutex lock</a
			>. All of this caching happens in different threads so to ensure thread-safe memory
			interactions this protected memory space is used.
		</p>
	</WritingSection>

	<WritingSection title="Main Benefits">
		<ol>
			<li>Fast response times</li>
			<p>
				When the site makes a request to load data from lcp.mattglei.ch/workouts all it is doing is
				reading the cached data from memory. No expensive database queries or anything.
			</p>
			<li>Data can be processed and aggregated</li>
			<p>
				With Steam, for example, there is no endpoint from the Steam REST API to get your games with
				the achievement data all in one request. So, for every game you need to make a request to
				load the achievement data. All of this is done by lcp so that when a request is made to
				lcp.mattglei.ch/steam it returns the games with their achievements all in one request. This
				cuts down +25 requests to the Steam REST API with each request taking +400ms down to one
				request that takes ~200ms.
			</p>
			<li>Prevent hitting API rate limits</li>
			<p>
				Most major APIs have rate limits. The Strava API for example only allows 100 requests every
				15 minutes. If I wasn't caching this data and was simply requesting the data every time that
				someone visited the site I could very easily encounter rate limiting. The REST API that is
				exposed by lcp has no rate limits, so my site can hit it every time a request is made
				without having to worry about rate limits.
			</p>
			<li>Prevent downtime</li>
			<p>
				Sometimes APIs have problems and are down. Because lcp caches the data and is essentially
				saving a copy, it does't have to depend about the source data being up. Downtime is more
				often than people realize and when you're using multiple APIs, the chance of one of them
				being down is even greater.
			</p>
		</ol>
	</WritingSection>

	<WritingSection title="Design Decisions">
		<ol>
			<li>Couldn't this be simpler?</li>
			<p>
				There are simpler solutions to purely load data onto my website. Why did I build this then?
				Here are a few reasons why:
			</p>
			<div class="custom-list">
				<p>
					Data caching and fetching are independent of the framework I am using to build my website.
					This separation of responsibilities is important as every so often I like to rebuild my
					personal website and try out a new framework (hence this being the 5th version of my
					personal website). My last personal website was built in <a
						href="https://nextjs.org"
						target="_blank">Next.js</a
					> for example.
				</p>
				<p>
					I want to use this data in other projects. For example, I use lcp in the <a
						href="https://github.com/gleich/terminal"
						target="_blank">ssh version of this website</a
					>. To have a central place to access all of this data instead of everything just getting
					pulled from my site is better architecture in my opinion.
				</p>
				<p>
					It has been a little while since I worked in Go and wanted to do a new project in the
					language.
				</p>
			</div>
			<li>Why use the Go programming language?</li>
			<p>
				Go is a popular language for building REST APIs. I've been using the language for a few
				years now and have a few reasons why I selected it for V2 of lcp:
			</p>
			<div class="custom-list">
				<p>
					The standard library makes it very easy to work with. I don't have to import a bunch of
					different packages for working with things like JSON and requests. A lot of these features
					come straight out of the box with the fantastic standard library.
				</p>
				<p>
					Go is very fast. Although I am not handling massive amounts of web traffic, being able to
					handle a request on the microsecond scale (literally) is great. Very happy with the
					performance I am getting.
				</p>
				<p>I have a lot of experience writing Go code and am very comfortable in the language.</p>
			</div>
			<li>Why is lcp on version 2?</li>
			<p>
				<a href="https://github.com/gleich/lcp" target="_blank">V1 of lcp</a> was written in the
				<a href="https://www.rust-lang.org" target="_blank">Rust programming language</a>. There are
				a few reasons why I wanted to rewrite lcp and create a second version:
			</p>
			<div class="custom-list">
				<p>
					I wanted to make a more generic cache. In V1 of lcp a lot of the codebase was a cache
					specific. This added a lot of code for each cache with zero benefits. Making a generic
					cache greatly reduced the amount of code/complexity of lcp V2.
				</p>
				<p>
					Go is easier to make APIs with compared to Rust in my opinion. Rust is pretty easy using
					the <a href="https://rocket.rs" target="_blank">rocket.rs</a> library, but working with the
					Go standard library makes things simpler.
				</p>
				<p>
					V1 of lcp used AWS S3 which I ended up replacing with a <a
						href="https://min.io"
						target="_blank">Minio</a
					> instance running on my Caprover server. The current Minio library for Rust is not stable,
					but the one for Go is. Switching to Go allows me to use the stable Minio library and cut out
					using S3. I replaced S3 with Minio because I didn't want to pay any costs associated with storing
					images from mapbox.
				</p>
			</div>
			<li>Why mix webhooks and polling?</li>
			<p>
				Using webhooks is ideal as it only reaches out to API when the data has actually changed.
				Not all APIs or data changes support webhooks which is why polling has to be used instead.
				For the GitHub API, there is no webhook for when the user's pinned repositories are changed
				(which is what the data is based on). For the Steam API, they simply don't support webhooks
				so polling is the only option.
			</p>
			<li>Why have separate endpoints instead of bundling them all together in one?</li>
			<p>
				Having each cache be independent of each other provides a separation of concerns which makes
				the application easier to maintain/work with. It also allows each section to load
				independently on the front end.
			</p>
		</ol>
	</WritingSection>
</Writing>

<style>
	.view-on-github {
		text-decoration: inherit;
		width: 100%;
		flex-shrink: 0;
		align-self: center;
		margin-bottom: 30px;
	}

	.statuses {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 5px;
		gap: 10px;
		align-items: center;
		width: 100%;
	}

	.custom-list {
		padding-top: 5px;
		padding-left: 25px;
	}

	.custom-list p::before {
		content: '- ';
	}

	.overview-diagram {
		width: 100%;
		height: auto;
		border-radius: var(--border-radius);
		overflow: hidden;
		margin: 10px 0;
	}

	@media (max-width: 830px) {
		.statuses {
			grid-template-columns: 1fr;
		}
	}
</style>
