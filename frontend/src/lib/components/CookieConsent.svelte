<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Button } from '$lib/components';

	let showBanner = $state(false);

	onMount(() => {
		if (!browser) return;

		const consent = localStorage.getItem('cookie-consent');
		if (!consent) {
			// Show banner after a small delay for better UX
			setTimeout(() => {
				showBanner = true;
			}, 1000);
		}
	});

	function acceptCookies() {
		if (!browser) return;

		localStorage.setItem('cookie-consent', 'accepted');
		showBanner = false;

		// Dispatch event for Analytics component
		window.dispatchEvent(
			new CustomEvent('cookie-consent-changed', {
				detail: 'accepted'
			})
		);

		// Reload page to initialize Google Analytics
		window.location.reload();
	}

	function rejectCookies() {
		if (!browser) return;

		localStorage.setItem('cookie-consent', 'rejected');
		showBanner = false;

		// Dispatch event for Analytics component
		window.dispatchEvent(
			new CustomEvent('cookie-consent-changed', {
				detail: 'rejected'
			})
		);
	}
</script>

{#if showBanner}
	<div
		class="fixed bottom-0 left-0 right-0 z-50 border-t border-secondary-200 bg-white shadow-2xl"
	>
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div class="flex-1">
					<h3 class="text-lg font-semibold text-secondary-900">Cookies y Privacidad</h3>
					<p class="mt-1 text-sm text-secondary-600">
						Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. Al aceptar,
						nos ayudas a entender cómo mejorar nuestros servicios.
						<a href="/privacidad" class="font-medium text-primary-600 hover:text-primary-700"
							>Política de Privacidad</a
						>
					</p>
				</div>
				<div class="flex gap-3">
					<button
						onclick={rejectCookies}
						class="rounded-lg border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-700 transition-colors hover:bg-secondary-50"
					>
						Rechazar
					</button>
					<Button variant="primary" size="md" onclick={acceptCookies}>Aceptar Cookies</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
