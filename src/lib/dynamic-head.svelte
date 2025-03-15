<script lang="ts">
	const {
		title,
		description,
		ogImageURL,
		ogImageWidth,
		ogImageHeight,
		keywords = []
	}: {
		title: string;
		description: string;
		ogImageURL: string;
		ogImageWidth: string;
		ogImageHeight: string;
		keywords?: string[];
	} = $props();

	keywords.concat([
		'matt gleich',
		'matt',
		'gleich',
		'matthew gleich',
		'matthew',
		'gleich',
		'photography',
		'coding',
		'cycling',
		'rit',
		'stainless',
		'bottomline technologies',
		'kcf technologies',
		'kcf'
	]);

	const name = 'Matt Gleich';

	const siteName = 'mattglei.ch';
	const siteURL = `https://${siteName}`;
</script>

<title>{title}</title>
<meta name="description" content={description} />

<link rel="author" href={siteURL} />
<meta name="author" content={name} />
<meta name="keywords" content={keywords.join(',')} />

<!-- opengraph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={title} />
<meta property="og:url" content={siteURL} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content="en-US" />
<meta property="og:image" content={ogImageURL} />
<meta property="og:image:width" content={ogImageWidth} />
<meta property="og:image:height" content={ogImageHeight} />
<meta property="og:type" content="website" />

<!-- twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:creator" content="@matt_gleich" />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={ogImageURL} />
<meta property="twitter:image:width" content={ogImageWidth} />
<meta property="twitter:image:height" content={ogImageHeight} />
