<script lang="ts">
	interface BreadcrumbItem {
		name: string;
		url: string;
	}

	interface Props {
		items: BreadcrumbItem[];
	}

	let { items }: Props = $props();

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>
