<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { BIRTHDAY, COUNTDOWN_ENABLED } from '#lib/config.ts';
	import Birthday from '#lib/features/birthday/Birthday.svelte';
	import ConfettiBurst from '#lib/features/confetti/ConfettiBurst.svelte';
	import { launchConfetti } from '#lib/features/confetti/confetti.svelte.ts';
	import Countdown from '#lib/features/countdown/Countdown.svelte';
	import Sparkles from '#lib/features/glitter/Sparkles.svelte';

	// Hora actual; null hasta montar (evita diferencias entre servidor y cliente).
	let now = $state<number | null>(null);

	onMount(() => {
		now = Date.now();
		const timer = setInterval(() => (now = Date.now()), 1000);
		return () => clearInterval(timer);
	});

	// Para revisar el diseño: /?modo=contador  o  /?modo=cumple
	const forced = page.url.searchParams.get('modo');

	let view = $derived(
		forced === 'cumple'
			? 'birthday'
			: forced === 'contador'
				? 'countdown'
				: !COUNTDOWN_ENABLED
					? 'birthday'
					: now === null
						? 'loading'
						: now >= BIRTHDAY
							? 'birthday'
							: 'countdown'
	);

	// Primer lanzamiento de confeti cuando aparece la pantalla de cumpleaños
	// (al entrar, o a la medianoche si la página ya estaba abierta).
	let launched = false;
	$effect(() => {
		if (view === 'birthday' && !launched) {
			launched = true;
			launchConfetti();
		}
	});
</script>

<svelte:head>
	<title>{view === 'birthday' ? '¡Feliz cumpleaños, Amorchitoo!' : 'Falta muy poquito…'}</title>
</svelte:head>

<Sparkles calm={view !== 'birthday'} />

{#if view === 'countdown'}
	<Countdown remaining={BIRTHDAY - (now ?? Date.now())} />
{:else if view === 'birthday'}
	<Birthday now={now ?? Date.now()} />
	<ConfettiBurst />
{:else}
	<div class="calm-bg min-h-svh"></div>
{/if}
