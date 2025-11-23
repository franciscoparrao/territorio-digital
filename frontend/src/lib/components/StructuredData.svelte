<script lang="ts">
	interface Person {
		name: string;
		jobTitle: string;
		email: string;
		telephone: string;
		url: string;
		sameAs?: string[];
		alumniOf?: Array<{
			name: string;
			url: string;
		}>;
	}

	interface Organization {
		name: string;
		description: string;
		url: string;
		logo: string;
		email: string;
		telephone: string;
		address?: {
			streetAddress: string;
			addressLocality: string;
			addressRegion: string;
			addressCountry: string;
		};
		sameAs?: string[];
		founder?: Person;
	}

	interface Props {
		type: 'organization' | 'person' | 'both' | 'localbusiness';
		organization?: Organization;
		person?: Person;
	}

	let { type, organization, person }: Props = $props();

	const organizationSchema = organization
		? {
				'@context': 'https://schema.org',
				'@type': type === 'localbusiness' ? 'LocalBusiness' : 'Organization',
				name: organization.name,
				description: organization.description,
				url: organization.url,
				logo: organization.logo,
				email: organization.email,
				telephone: organization.telephone,
				...(organization.address && { address: {
					'@type': 'PostalAddress',
					streetAddress: organization.address.streetAddress,
					addressLocality: organization.address.addressLocality,
					addressRegion: organization.address.addressRegion,
					addressCountry: organization.address.addressCountry
				}}),
				...(organization.sameAs && { sameAs: organization.sameAs }),
				...(organization.founder && { founder: organization.founder }),
				...(type === 'localbusiness' && {
					'@type': 'ProfessionalService',
					priceRange: '$$',
					areaServed: {
						'@type': 'Country',
						name: 'Chile'
					}
				})
			}
		: null;

	const personSchema = person
		? {
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: person.name,
				jobTitle: person.jobTitle,
				email: person.email,
				telephone: person.telephone,
				url: person.url,
				...(person.sameAs && { sameAs: person.sameAs }),
				...(person.alumniOf && { alumniOf: person.alumniOf })
			}
		: null;
</script>

<svelte:head>
	{#if (type === 'organization' || type === 'localbusiness') && organizationSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
	{:else if type === 'person' && personSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{:else if type === 'both' && organizationSchema && personSchema}
		{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
		{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{/if}
</svelte:head>
