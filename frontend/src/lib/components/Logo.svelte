<script lang="ts">
	interface Props {
		class?: string;
		size?: number;
	}

	let { class: className = '', size = 32 }: Props = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 100 100"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Background circle -->
	<circle cx="50" cy="50" r="48" fill="#0284c7" />

	<!-- Mountain/Territory shape -->
	<path d="M25 65 L35 50 L45 55 L50 40 L60 50 L70 45 L75 65 Z" fill="white" opacity="0.9" />

	<!-- Data points/nodes -->
	<circle cx="35" cy="50" r="3" fill="white" />
	<circle cx="50" cy="40" r="3" fill="white" />
	<circle cx="60" cy="50" r="3" fill="white" />

	<!-- Connection lines (digital aspect) -->
	<line x1="35" y1="50" x2="50" y2="40" stroke="white" stroke-width="1.5" opacity="0.6" />
	<line x1="50" y1="40" x2="60" y2="50" stroke="white" stroke-width="1.5" opacity="0.6" />
</svg>
