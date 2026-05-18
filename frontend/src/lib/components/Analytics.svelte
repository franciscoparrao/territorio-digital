<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Props {
		measurementId: string;
		googleAdsId?: string;
	}

	let { measurementId, googleAdsId }: Props = $props();

	onMount(() => {
		if (!browser) return;

		const consent = localStorage.getItem('cookie-consent');

		if (consent === 'accepted') {
			loadGoogleAnalytics();
		}

		window.addEventListener('cookie-consent-changed', ((event: CustomEvent) => {
			if (event.detail === 'accepted') {
				loadGoogleAnalytics();
			} else if (event.detail === 'rejected' && window.gtag) {
				window.gtag('consent', 'update', {
					analytics_storage: 'denied',
					ad_storage: 'denied'
				});
			}
		}) as EventListener);
	});

	function loadGoogleAnalytics() {
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag(...args: any[]) {
			window.dataLayer.push(args);
		}
		window.gtag = gtag;

		// Consent mode GDPR-compliant: analytics granted (user accepted), ads denied by default
		gtag('consent', 'default', {
			analytics_storage: 'granted',
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied'
		});

		gtag('js', new Date());
		gtag('config', measurementId, { send_page_view: true });

		if (googleAdsId) {
			gtag('config', googleAdsId);
		}
	}
</script>

<!-- This component doesn't render anything -->
