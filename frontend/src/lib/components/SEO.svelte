<script lang="ts">
	interface Props {
		title: string;
		description: string;
		url?: string;
		image?: string;
		type?: 'website' | 'article' | 'profile';
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			section?: string;
			tags?: string[];
		};
	}

	let {
		title,
		description,
		url = 'https://territoriodigital.cl',
		image = 'https://territoriodigital.cl/og-image.jpg',
		type = 'website',
		article
	}: Props = $props();

	const siteTitle = 'Territorio Digital';
	const fullTitle = title === siteTitle ? title : `${title} - ${siteTitle}`;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:locale" content="es_CL" />

	{#if article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.author}
			<meta property="article:author" content={article.author} />
		{/if}
		{#if article.section}
			<meta property="article:section" content={article.section} />
		{/if}
		{#if article.tags}
			{#each article.tags as tag (tag)}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Additional Meta Tags -->
	<meta name="author" content="Francisco José Parra Ortiz" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={url} />
</svelte:head>
