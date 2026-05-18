<script lang="ts">
	import '../app.css';
	import { Header, Footer, Analytics, CookieConsent } from '$lib/components';

	let { children } = $props();
</script>

<Analytics measurementId="G-V1040V9ZS2" googleAdsId="AW-979698901" />

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>

<CookieConsent />
