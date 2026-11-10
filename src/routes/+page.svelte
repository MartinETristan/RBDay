<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { BIRTHDAY } from '#lib/data.ts';
	import Birthday from '#lib/components/Birthday.svelte';
	import ConfettiBurst from '#lib/components/ConfettiBurst.svelte';
	import Countdown from '#lib/components/Countdown.svelte';
	import Sparkles from '#lib/components/Sparkles.svelte';

	// Hora actual; null hasta montar (evita diferencias entre servidor y cliente).
	let now = $state<number | null>(null);
	let burst = $state(0);

	onMount(() => {
		now = Date.now();
		const timer = setInterval(() => (now = Date.now()), 1000);
		return () => clearInterval(timer);
	});

	// Para revisar el diseño: /?modo=contador  o  /?modo=cumple
	type Preview = 'auto' | 'contador' | 'cumple';
	const fromUrl = page.url.searchParams.get('modo');
	let preview = $state<Preview>(fromUrl === 'contador' || fromUrl === 'cumple' ? fromUrl : 'auto');
	const forced = $derived(preview === 'auto' ? null : preview);
	const nextPreview: Record<Preview, Preview> = {
		auto: 'contador',
		contador: 'cumple',
		cumple: 'auto'
	};

	let view = $derived(
		forced === 'cumple'
			? 'birthday'
			: forced === 'contador'
				? 'countdown'
				: now === null
					? 'loading'
					: now >= BIRTHDAY
						? 'birthday'
						: 'countdown'
	);
</script>

<svelte:head>
	<title>{view === 'birthday' ? '¡Feliz cumpleaños, Rosario!' : 'Falta muy poquito…'}</title>
</svelte:head>

<Sparkles calm={view !== 'birthday'} />

{#if view === 'countdown'}
	<Countdown remaining={BIRTHDAY - (now ?? Date.now())} />
{:else if view === 'birthday'}
	<Birthday now={now ?? Date.now()} onMoreConfetti={() => burst++} />
	<ConfettiBurst run={burst} />
{:else}
	<div class="hero-bg min-h-svh"></div>
{/if}

<!-- Solo en desarrollo (pnpm dev): no aparece en la página publicada -->
{#if import.meta.env.DEV}
	<button
		type="button"
		onclick={() => (preview = nextPreview[preview])}
		class="fixed bottom-3 left-3 z-50 min-h-11 cursor-pointer rounded-full bg-berry px-4 text-sm font-semibold text-cream shadow-lg"
	>
		Vista: {preview === 'auto' ? 'automática' : preview === 'contador' ? 'contador' : 'cumpleaños'}
	</button>
{/if}
