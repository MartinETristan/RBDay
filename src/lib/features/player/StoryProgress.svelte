<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { nav, scroll, scrollToElement } from '#lib/shared/scroll/lenis.svelte.ts';
	import { SLIDE_ROTATION } from './tracks.ts';
	import { musicForKey, musicForTrack } from './music.svelte.ts';
	import { MANUAL_IDLE_SECONDS, autoMove, SCENE_SECONDS, player } from './player.svelte.ts';

	let scenes = $state<HTMLElement[]>([]);
	let active = $state(0);

	onMount(() => {
		scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
	});

	// La escena "activa" es la que cruza el centro de la pantalla (en X o en Y según el modo).
	$effect(() => {
		if (!scenes.length) return;
		const margin = scroll.horizontal ? '0px -50% 0px -50%' : '-50% 0px -50% 0px';
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = scenes.indexOf(e.target as HTMLElement);
				}
			},
			{ rootMargin: margin, threshold: 0 }
		);
		scenes.forEach((s) => io.observe(s));
		return () => io.disconnect();
	});

	// Cada canción dura 2 "diapositivas", contando desde el capítulo 1 (la portada sigue con la
	// primera). Las escenas que comparten `data-unit` (p. ej. toda la galería) cuentan como una.
	$effect(() => {
		if (!scenes.length) return;
		const fixed = scenes[active]?.dataset.music;
		// untrack: la música cambia solo al cambiar de escena, no cuando se elige otra canción a mano.
		if (fixed) return untrack(() => musicForKey(fixed));
		const keys = scenes.map((s) => s.dataset.unit ?? s.id);
		const units = keys.filter((k, i) => k !== keys[i - 1]);
		const first = Math.max(units.indexOf('capitulo-1'), 0);
		const n = Math.max(0, units.indexOf(keys[active]) - first);
		untrack(() => musicForTrack(SLIDE_ROTATION[Math.floor(n / 2) % SLIDE_ROTATION.length]));
	});

	const secondsOf = (i: number) => Number(scenes[i]?.dataset.seconds) || SCENE_SECONDS;

	const isManual = (i: number) => scenes[i]?.dataset.manual !== undefined;

	const go = (i: number) => !nav.locked && scenes[i] && scrollToElement(scenes[i]);

	// Modo historia: cada escena dura sus segundos y luego pasa a la siguiente.
	// Si la persona cambia de escena a mano (barra, flechas, scroll), el modo historia se pausa;
	// tras MANUAL_IDLE_SECONDS quieta en una escena, vuelve a correr con el tiempo de esa escena.
	let manual = $state(false);
	let autoTarget = -1;
	let prevActive = -1;

	$effect(() => {
		const a = active;
		const changed = prevActive !== -1 && a !== prevActive;
		prevActive = a;
		if (!changed || !player.playing) return;
		if (a === autoTarget || autoMove.next) manual = false;
		else manual = true;
		autoTarget = -1;
		autoMove.next = false;
	});

	$effect(() => {
		if (!player.playing) manual = false;
	});

	$effect(() => {
		if (!player.playing || !scenes.length) return;
		const current = active;
		if (current >= scenes.length - 1) {
			player.playing = false; // llegó al final
			return;
		}
		if (manual) {
			const idle = setTimeout(() => (manual = false), MANUAL_IDLE_SECONDS * 1000);
			return () => clearTimeout(idle);
		}
		if (isManual(current)) return; // escena manual: no avanza sola
		const timer = setTimeout(() => {
			autoTarget = current + 1;
			go(current + 1);
		}, secondsOf(current) * 1000);
		return () => clearTimeout(timer);
	});
</script>

<!-- Barra de progreso estilo historias: una pieza por escena. Oculta en la portada. -->
<nav
	aria-label="Progreso"
	aria-hidden={active === 0}
	inert={active === 0}
	class="fixed inset-x-3 top-3 z-50 flex gap-1 rounded-full bg-cream/75 p-1.5 backdrop-blur-sm transition-opacity duration-500 horiz:inset-x-6 {active ===
	0
		? 'pointer-events-none opacity-0'
		: 'opacity-100'}"
>
	{#each scenes as s, i (i)}
		<button
			type="button"
			aria-label="Ir a: {s.dataset.title}"
			aria-current={i === active ? 'step' : undefined}
			disabled={nav.locked}
			onclick={() => go(i)}
			class="group flex h-4 flex-1 items-center {nav.locked ? 'cursor-default' : 'cursor-pointer'}"
		>
			<span class="relative block h-1.5 w-full overflow-hidden rounded-full bg-rose/30">
				{#if i < active || (i === active && (!player.playing || manual || isManual(i)))}
					<span class="absolute inset-0 bg-rose-400"></span>
				{:else if i === active}
					{#key active}
						<span
							class="seg-fill absolute inset-y-0 left-0 bg-rose-400"
							style:--dur="{secondsOf(i)}s"
						></span>
					{/key}
				{/if}
			</span>
		</button>
	{/each}
</nav>

<!-- Flechas (solo escritorio) -->
<div class="fixed right-6 bottom-6 z-50 hidden gap-2 horiz:flex">
	<button
		type="button"
		aria-label="Escena anterior"
		disabled={nav.locked || active === 0}
		onclick={() => go(active - 1)}
		class="flex size-12 cursor-pointer items-center justify-center rounded-full bg-cream text-rose-400 shadow-[0_4px_0_var(--color-rose)] transition enabled:hover:-translate-y-0.5 disabled:opacity-40"
	>
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.4"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg
		>
	</button>
	<button
		type="button"
		aria-label="Escena siguiente"
		disabled={nav.locked || active >= scenes.length - 1}
		onclick={() => go(active + 1)}
		class="flex size-12 cursor-pointer items-center justify-center rounded-full bg-cream text-rose-400 shadow-[0_4px_0_var(--color-rose)] transition enabled:hover:-translate-y-0.5 disabled:opacity-40"
	>
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.4"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg
		>
	</button>
</div>
