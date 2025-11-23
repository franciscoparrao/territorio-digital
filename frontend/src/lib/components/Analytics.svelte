<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Props {
		measurementId: string;
	}

	let { measurementId }: Props = $props();

	onMount(() => {
		if (!browser) return;

		// Check if user has consented to analytics cookies
		const consent = localStorage.getItem('cookie-consent');

		if (consent === 'accepted') {
			loadGoogleAnalytics();
		}

		// Listen for consent changes
		window.addEventListener('cookie-consent-changed', ((event: CustomEvent) => {
			if (event.detail === 'accepted') {
				loadGoogleAnalytics();
			} else if (event.detail === 'rejected') {
				// Disable Google Analytics
				if (window.gtag) {
					window.gtag('consent', 'update', {
						analytics_storage: 'denied'
					});
				}
			}
		}) as EventListener);
	});

	function loadGoogleAnalytics() {
		// Load gtag.js script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script);

		// Initialize dataLayer and gtag
		window.dataLayer = window.dataLayer || [];
		function gtag(...args: any[]) {
			window.dataLayer.push(args);
		}
		window.gtag = gtag;

		// Configure consent mode (GDPR compliant)
		gtag('consent', 'default', {
			analytics_storage: 'granted',
			ad_storage: 'denied',
			ad_user_data: 'denied',
			ad_personalization: 'denied'
		});

		gtag('js', new Date());
		gtag('config', measurementId, {
			send_page_view: true
		});
	}
</script>

<!-- This component doesn't render anything -->
