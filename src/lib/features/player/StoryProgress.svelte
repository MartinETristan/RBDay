<script lang="ts">
	import { onMount } from 'svelte';
	import { nav, scroll, scrollToElement } from '#lib/shared/scroll/lenis.svelte.ts';
	import { tracks } from './tracks.ts';
	import { musicForTrack } from './music.svelte.ts';
	import { SCENE_SECONDS, player } from './player.svelte.ts';

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
		const keys = scenes.map((s) => s.dataset.unit ?? s.id);
		const units = keys.filter((k, i) => k !== keys[i - 1]);
		const first = Math.max(units.indexOf('capitulo-1'), 0);
		const n = Math.max(0, units.indexOf(keys[active]) - first);
		musicForTrack(Math.floor(n / 2) % tracks.length);
	});

	const go = (i: number) => !nav.locked && scenes[i] && scrollToElement(scenes[i]);

	// Modo historia: cada escena dura SCENE_SECONDS y luego pasa a la siguiente.
	// Si la persona cambia de escena (barra, flechas, scroll), el tiempo se reinicia.
	$effect(() => {
		if (!player.playing || !scenes.length) return;
		const current = active;
		if (current >= scenes.length - 1) {
			player.playing = false; // llegó al final
			return;
		}
		const timer = setTimeout(() => go(current + 1), SCENE_SECONDS * 1000);
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
				{#if i < active || (i === active && !player.playing)}
					<span class="absolute inset-0 bg-rose-400"></span>
				{:else if i === active}
					{#key active}
						<span
							class="seg-fill absolute inset-y-0 left-0 bg-rose-400"
							style:--dur="{SCENE_SECONDS}s"
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
