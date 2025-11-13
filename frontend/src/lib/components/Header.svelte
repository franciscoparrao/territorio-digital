<script lang="ts">
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';

	let mobileMenuOpen = $state(false);

	const navigation = [
		{ name: 'Inicio', href: '/' },
		{ name: 'Servicios', href: '/servicios' },
		{ name: 'Portfolio', href: '/portfolio' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Sobre mí', href: '/about' },
		{ name: 'Contacto', href: '/contacto' }
	];

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function isActive(href: string): boolean {
		return $page.url.pathname === href;
	}
</script>

<header class="fixed top-0 z-50 w-full bg-white shadow-sm">
	<nav class="container-custom">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2" onclick={closeMobileMenu}>
					<Logo />
					<span class="text-xl font-bold text-secondary-900">Territorio Digital</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden items-center space-x-1 md:flex">
				{#each navigation as item (item.href)}
					<a
						href={item.href}
						class="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200
							{isActive(item.href)
							? 'bg-primary-50 text-primary-700'
							: 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'}"
					>
						{item.name}
					</a>
				{/each}
			</div>

			<!-- CTA Button (Desktop) -->
			<div class="hidden md:block">
				<a href="/contacto" class="btn-primary"> Comenzar proyecto </a>
			</div>

			<!-- Mobile menu button -->
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-lg p-2 text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 md:hidden"
				onclick={toggleMobileMenu}
				aria-expanded={mobileMenuOpen}
				aria-label="Menú principal"
			>
				<span class="sr-only">Abrir menú principal</span>
				{#if !mobileMenuOpen}
					<!-- Hamburger icon -->
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{:else}
					<!-- Close icon -->
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-secondary-200 md:hidden">
			<div class="container-custom space-y-1 py-4">
				{#each navigation as item (item.href)}
					<a
						href={item.href}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200
							{isActive(item.href)
							? 'bg-primary-50 text-primary-700'
							: 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'}"
						onclick={closeMobileMenu}
					>
						{item.name}
					</a>
				{/each}
				<div class="pt-4">
					<a
						href="/contacto"
						class="btn-primary block w-full text-center"
						onclick={closeMobileMenu}
					>
						Comenzar proyecto
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

<!-- Spacer to prevent content from going under fixed header -->
<div class="h-16"></div>
