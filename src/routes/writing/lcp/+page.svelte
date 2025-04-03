<script lang="ts">
	import Card from '$lib/card.svelte';
	import Github from '$lib/icons/github.svelte';
	import ViewButton from '$lib/view-button.svelte';
	import Writing from '$lib/writing.svelte';
	import writings from '../writings';
	import type { LCPData } from './+page.server';
	import CacheStatus from './cache-status.svelte';

	const { data }: { data: LCPData } = $props();
</script>

<Writing writing={writings.get('lcp')!}>
	<a class="view-on-github" href="https://github.com/gleich/lcp-2" target="_blank">
		<ViewButton on="GitHub" icon={Github} />
	</a>

	<Card>
		<h3>Cache Status Overview</h3>
		<div class="statuses">
			{#await data.projects}
				<p>Loading projects cache...</p>
			{:then projects}
				<CacheStatus name="Projects" updated={projects?.updated} />
			{/await}
			{#await data.workouts}
				<p>Loading workouts cache...</p>
			{:then workouts}
				<CacheStatus name="Workouts" updated={workouts?.updated} />
			{/await}
			{#await data.music}
				<p>Loading music cache...</p>
			{:then music}
				<CacheStatus name="Music" updated={music?.updated} />
			{/await}
			{#await data.games}
				<p>Loading games cache...</p>
			{:then games}
				<CacheStatus name="Games" updated={games?.updated} />
			{/await}
		</div>
	</Card>

	<Card>
		<h3>What is lcp?</h3>
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
	</Card>

	<Card>
		<h3>System Overview</h3>
		<img class="overview-diagram" src="/writings/lcp/overview.webp" alt="Overview diagram" />
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
			<a href="https://en.wikipedia.org/wiki/Lock_(computer_science)">mutex lock</a>. All of this
			caching happens in different threads so to ensure thread-safe memory interactions this
			protected memory space is used.
		</p>
	</Card>

	<Card>
		<h3>Main benefits</h3>
		<ol>
			<li>Fast response times</li>
			<p>
				When the site makes a request to load data from lcp.dev.mattglei.ch/strava all it is doing
				is reading the cached data from memory. No expensive database queries or anything.
			</p>
			<li>Data can be processed and aggregated</li>
			<p>
				With Steam, for example, there is no endpoint from the Steam REST API to get your games with
				the achievement data all in one request. So, for every game you need to make a request to
				load the achievement data. All of this is done by lcp so that when a request is made to
				lcp.dev.mattglei.ch/steam it returns the games with their achievements all in one request.
				This cuts down +25 requests to the Steam REST API with each request taking +400ms down to
				one request that takes ~200ms.
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
	</Card>

	<Card>
		<h3>Design decisions</h3>
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
			<li>Why have three separate endpoints instead of bundling them all together in one?</li>
			<p>
				First of all, having each cache be independent of each other provides a separation of
				concerns which makes the application easier to maintain/work with. It also allows each
				section to load independently on the front end.
			</p>
		</ol>
	</Card>
</Writing>

<style>
	.view-on-github {
		text-decoration: inherit;
		max-width: 200px;
		width: 100%;
		flex-shrink: 0;
		align-self: center;
		margin-bottom: 30px;
	}

	.statuses {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: fit-content;
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
	}

	ol > li {
		color: var(--green-foreground);
		background-color: var(--green-background);
		padding: 2px 5px;
		margin-top: 5px;
		width: fit-content;
		border-radius: 2px;
	}

	ol {
		padding-bottom: 10px;
	}

	ol p {
		padding-left: 25px;
	}

	ol > p {
		padding-top: 5px;
	}

	h3 {
		margin-bottom: 5px;
	}
</style>
