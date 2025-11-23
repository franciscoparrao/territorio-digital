<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Card, Section, SEO } from '$lib/components';

	let formData = $state({
		name: '',
		email: '',
		company: '',
		service: '',
		message: '',
		// Honeypot field - should remain empty
		website: '',
		// Timestamp for bot detection
		_timestamp: Date.now()
	});

	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	onMount(() => {
		// Set initial timestamp when component mounts
		formData._timestamp = Date.now();
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Anti-spam validation: Honeypot check
		if (formData.website !== '') {
			// Bot detected - honeypot field was filled
			console.log('Spam detected: honeypot field filled');
			return;
		}

		// Anti-spam validation: Time check (minimum 3 seconds to fill form)
		const timeSpent = Date.now() - formData._timestamp;
		if (timeSpent < 3000) {
			// Form filled too quickly - likely a bot
			console.log('Spam detected: form filled too quickly');
			formState = 'error';
			errorMessage = 'Por favor, tómate un momento para completar el formulario correctamente.';
			return;
		}

		formState = 'submitting';

		try {
			// Use relative URL so nginx can proxy to backend
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					company: formData.company,
					service: formData.service,
					message: formData.message,
					_timestamp: formData._timestamp
				})
			});

			if (response.ok) {
				formState = 'success';

				// Track form submission in Google Analytics
				if (window.gtag) {
					window.gtag('event', 'form_submit', {
						event_category: 'Contact',
						event_label: formData.service || 'General',
						value: 1
					});
				}

				// Reset form
				formData = {
					name: '',
					email: '',
					company: '',
					service: '',
					message: '',
					website: '',
					_timestamp: Date.now()
				};
			} else {
				throw new Error('Error al enviar el formulario');
			}
		} catch {
			formState = 'error';
			errorMessage =
				'Hubo un error al enviar el formulario. Por favor intenta nuevamente o contáctanos directamente por email.';
		}
	}

	const contactMethods = [
		{
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
			title: 'Email',
			value: 'contacto@territorio-digital.cl',
			link: 'mailto:contacto@territorio-digital.cl'
		},
		{
			icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
			title: 'Teléfono',
			value: '+56 9 5682 6682',
			link: 'tel:+56956826682'
		},
		{
			icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
			title: 'Ubicación',
			value: 'Santiago, Región Metropolitana, Chile',
			link: '#'
		}
	];
</script>

<SEO
	title="Contacto - Cotiza tu Proyecto | Territorio Digital"
	description="Solicita una cotización para tu proyecto de desarrollo web, data science, machine learning o análisis satelital. Respuesta en 24 horas. Consultoría gratuita inicial."
	url="https://territorio-digital.cl/contacto"
	type="website"
/>

<!-- Hero -->
<Section background="gradient" padding="lg">
	<div class="mx-auto max-w-3xl text-center">
		<h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
			Hablemos de tu <span class="text-primary-600">proyecto</span>
		</h1>
		<p class="mt-6 text-lg text-secondary-600">
			¿Tienes una idea, un problema que resolver o simplemente quieres explorar posibilidades?
			Nuestro equipo está listo para ayudarte a hacerla realidad.
		</p>
	</div>
</Section>

<!-- Contact Form & Info -->
<Section background="white" padding="lg">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Contact Form -->
			<div>
				<h2 class="text-2xl font-bold text-secondary-900">Envíanos un mensaje</h2>
				<p class="mt-2 text-secondary-600">Completa el formulario y nuestro equipo te responderá a la brevedad.</p>

				{#if formState === 'success'}
					<Card
						variant="bordered"
						padding="md"
						class="mt-6 border-l-4 border-l-green-500 bg-green-50"
					>
						<div class="flex">
							<svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
							<div class="ml-3">
								<p class="text-sm font-medium text-green-800">¡Mensaje enviado exitosamente!</p>
								<p class="mt-1 text-sm text-green-700">
									Nuestro equipo te responderá pronto. Gracias por contactarnos.
								</p>
							</div>
						</div>
					</Card>
				{/if}

				{#if formState === 'error'}
					<Card variant="bordered" padding="md" class="mt-6 border-l-4 border-l-red-500 bg-red-50">
						<div class="flex">
							<svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
							<div class="ml-3">
								<p class="text-sm font-medium text-red-800">Error al enviar</p>
								<p class="mt-1 text-sm text-red-700">{errorMessage}</p>
							</div>
						</div>
					</Card>
				{/if}

				<form onsubmit={handleSubmit} class="mt-8 space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-secondary-700">
							Nombre completo *
						</label>
						<input
							type="text"
							id="name"
							required
							bind:value={formData.name}
							class="mt-1 block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 placeholder-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							placeholder="Juan Pérez"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-secondary-700">
							Email *
						</label>
						<input
							type="email"
							id="email"
							required
							bind:value={formData.email}
							class="mt-1 block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 placeholder-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							placeholder="juan@empresa.com"
						/>
					</div>

					<div>
						<label for="company" class="block text-sm font-medium text-secondary-700">
							Empresa / Organización
						</label>
						<input
							type="text"
							id="company"
							bind:value={formData.company}
							class="mt-1 block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 placeholder-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							placeholder="Mi Empresa"
						/>
					</div>

					<!-- Honeypot field - hidden from real users, bots will fill it -->
					<div class="!hidden" aria-hidden="true">
						<label for="website">Website (leave blank)</label>
						<input
							type="text"
							id="website"
							name="website"
							bind:value={formData.website}
							tabindex="-1"
							autocomplete="off"
						/>
					</div>

					<div>
						<label for="service" class="block text-sm font-medium text-secondary-700">
							Servicio de interés
						</label>
						<select
							id="service"
							bind:value={formData.service}
							class="mt-1 block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
						>
							<option value="">Selecciona un servicio</option>
							<option value="desarrollo-web">Desarrollo Web</option>
							<option value="data-science">Data Science & ML</option>
							<option value="analisis-satelital">Análisis Satelital</option>
							<option value="ingenieria-datos">Ingeniería de Datos</option>
							<option value="asesoria">Asesoría Técnica</option>
							<option value="otro">Otro</option>
						</select>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-secondary-700">
							Mensaje *
						</label>
						<textarea
							id="message"
							required
							rows="5"
							bind:value={formData.message}
							class="mt-1 block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 placeholder-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
							placeholder="Cuéntanos sobre tu proyecto o necesidad..."
						></textarea>
					</div>

					<div>
						<Button
							type="submit"
							variant="primary"
							size="lg"
							class="w-full"
							disabled={formState === 'submitting'}
						>
							{formState === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
						</Button>
					</div>
				</form>
			</div>

			<!-- Contact Information -->
			<div>
				<h2 class="text-2xl font-bold text-secondary-900">Información de contacto</h2>
				<p class="mt-2 text-secondary-600">
					También puedes contactarnos directamente a través de estos medios.
				</p>

				<div class="mt-8 space-y-4">
					{#each contactMethods as method (method.title)}
						<Card variant="bordered" padding="md">
							<div class="flex items-start">
								<div class="flex-shrink-0">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600"
									>
										<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d={method.icon}
											/>
										</svg>
									</div>
								</div>
								<div class="ml-4">
									<h3 class="text-sm font-medium text-secondary-900">{method.title}</h3>
									<a
										href={method.link}
										class="mt-1 text-sm text-primary-600 hover:text-primary-700"
										target={method.title === 'LinkedIn' ? '_blank' : undefined}
										rel={method.title === 'LinkedIn' ? 'noopener noreferrer' : undefined}
									>
										{method.value}
									</a>
								</div>
							</div>
						</Card>
					{/each}
				</div>

				<div class="mt-12">
					<h3 class="text-lg font-semibold text-secondary-900">Tiempo de respuesta</h3>
					<p class="mt-2 text-secondary-600">
						Nuestro equipo responde dentro de 24-48 horas hábiles. Para consultas urgentes, por favor
						indícalo en el mensaje.
					</p>
				</div>

				<div class="mt-8">
					<h3 class="text-lg font-semibold text-secondary-900">Horario de atención</h3>
					<p class="mt-2 text-secondary-600">
						Lunes a Viernes: 9:00 - 18:00 hrs (GMT-3)<br />
						Atendemos proyectos de todo tipo y tamaño. Desde startups hasta empresas consolidadas.
					</p>
				</div>
			</div>
		</div>
	</div>
</Section>
