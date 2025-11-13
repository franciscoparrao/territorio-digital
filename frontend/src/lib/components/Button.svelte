<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		children: Snippet;
		onclick?: (event: MouseEvent) => void;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		disabled = false,
		class: className = '',
		children,
		onclick
	}: Props = $props();

	const baseClasses =
		'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

	const variantClasses = {
		primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
		secondary:
			'border border-secondary-300 bg-white text-secondary-700 hover:bg-secondary-50 focus:ring-primary-500',
		outline:
			'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
		ghost:
			'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 focus:ring-primary-500'
	};

	const sizeClasses = {
		sm: 'px-4 py-2 text-sm rounded-md',
		md: 'px-6 py-3 text-base rounded-lg',
		lg: 'px-8 py-4 text-lg rounded-lg'
	};

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

{#if href}
	<a {href} class={classes} aria-disabled={disabled}>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={classes} {onclick}>
		{@render children()}
	</button>
{/if}
