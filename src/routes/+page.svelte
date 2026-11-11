<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { BIRTHDAY, COUNTDOWN_ENABLED, REMEMBER_CODE } from '#lib/config.ts';
	import Birthday from '#lib/features/birthday/Birthday.svelte';
	import ConfettiBurst from '#lib/features/confetti/ConfettiBurst.svelte';
	import { launchConfetti } from '#lib/features/confetti/confetti.svelte.ts';
	import Countdown from '#lib/features/countdown/Countdown.svelte';
	import CodeGate from '#lib/features/gate/CodeGate.svelte';
	import Sparkles from '#lib/features/glitter/Sparkles.svelte';

	// Hora actual; null hasta montar (evita diferencias entre servidor y cliente).
	let now = $state<number | null>(null);

	// Candado: null hasta montar. Con REMEMBER_CODE se recuerda en este navegador;
	// si no, se pide en cada carga.
	const UNLOCK_KEY = 'rbday-unlocked';
	let unlocked = $state<boolean | null>(null);

	function unlock() {
		unlocked = true;
		if (REMEMBER_CODE) {
			try {
				localStorage.setItem(UNLOCK_KEY, '1');
			} catch {
				// Sin almacenamiento (modo privado): se volverá a pedir al recargar.
			}
		}
	}

	onMount(() => {
		unlocked = false;
		try {
			if (REMEMBER_CODE) unlocked = localStorage.getItem(UNLOCK_KEY) === '1';
			// Sin recordar: borra lo que se haya guardado antes, para que no quede desbloqueado.
			else localStorage.removeItem(UNLOCK_KEY);
		} catch {
			// Sin almacenamiento: se pide el código.
		}
		now = Date.now();
		const timer = setInterval(() => (now = Date.now()), 1000);
		return () => clearInterval(timer);
	});

	// Para revisar el diseño: /?modo=contador  o  /?modo=cumple
	const forced = page.url.searchParams.get('modo');

	let screen = $derived(
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

	// El código solo protege el contenido del cumpleaños; el contador se ve sin él.
	let view = $derived(
		screen !== 'birthday' ? screen : unlocked === null ? 'loading' : unlocked ? 'birthday' : 'gate'
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

{#if view === 'gate'}
	<CodeGate onunlock={unlock} />
{:else if view === 'countdown'}
	<Countdown remaining={BIRTHDAY - (now ?? Date.now())} />
{:else if view === 'birthday'}
	<Birthday now={now ?? Date.now()} />
	<ConfettiBurst />
{:else}
	<div class="calm-bg min-h-svh"></div>
{/if}
