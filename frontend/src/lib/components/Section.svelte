<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		background?: 'white' | 'gray' | 'primary' | 'gradient';
		padding?: 'sm' | 'md' | 'lg' | 'xl';
		container?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		background = 'white',
		padding = 'lg',
		container = true,
		class: className = '',
		children
	}: Props = $props();

	const backgroundClasses = {
		white: 'bg-white',
		gray: 'bg-secondary-50',
		primary: 'bg-primary-50',
		gradient: 'bg-gradient-to-br from-primary-50 to-white'
	};

	const paddingClasses = {
		sm: 'py-12',
		md: 'py-16 sm:py-20',
		lg: 'py-16 sm:py-20 lg:py-24',
		xl: 'py-20 sm:py-24 lg:py-32'
	};

	const sectionClasses = `${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`;
</script>

<section class={sectionClasses}>
	{#if container}
		<div class="container-custom">
			{@render children()}
		</div>
	{:else}
		{@render children()}
	{/if}
</section>
