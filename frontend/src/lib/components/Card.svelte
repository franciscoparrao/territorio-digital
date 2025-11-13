<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'bordered' | 'elevated';
		padding?: 'sm' | 'md' | 'lg';
		hover?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'default',
		padding = 'md',
		hover = false,
		class: className = '',
		children
	}: Props = $props();

	const baseClasses = 'rounded-lg transition-all duration-200';

	const variantClasses = {
		default: 'bg-white',
		bordered: 'bg-white border border-secondary-200',
		elevated: 'bg-white shadow-md'
	};

	const paddingClasses = {
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

	const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`;
</script>

<div class={classes}>
	{@render children()}
</div>
