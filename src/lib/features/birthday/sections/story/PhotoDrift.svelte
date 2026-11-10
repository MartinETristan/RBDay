<script lang="ts">
	import { onMount } from 'svelte';
	import { SCENE_SECONDS } from '#lib/features/player/player.svelte.ts';

	/** Fotos de fondo: una a la vez, con crossfade y movimiento lento; el ciclo completo dura una escena. */
	let { photos }: { photos: string[] } = $props();

	let active = $state(0);
	const slot = $derived((SCENE_SECONDS * 1000) / Math.max(photos.length, 1));

	let root: HTMLDivElement;
	let layer: HTMLDivElement;

	onMount(() => {
		// Parallax: la capa se desplaza más lento que la escena según su posición en pantalla.
		const FACTOR = 0.12;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const scene = root.closest('section');
		let raf = 0;
		const update = () => {
			raf = 0;
			if (!scene || reduced) return;
			const r = scene.getBoundingClientRect();
			const horizontal = document.documentElement.classList.contains('horiz');
			const offset = horizontal
				? r.left + r.width / 2 - innerWidth / 2
				: r.top + r.height / 2 - innerHeight / 2;
			layer.style.transform = horizontal
				? `translate3d(${-offset * FACTOR}px,0,0)`
				: `translate3d(0,${-offset * FACTOR}px,0)`;
		};
		const queue = () => (raf ||= requestAnimationFrame(update));
		update();
		addEventListener('scroll', queue, { passive: true });
		addEventListener('resize', queue);

		const t =
			photos.length > 1 ? setInterval(() => (active = (active + 1) % photos.length), slot) : 0;
		return () => {
			removeEventListener('scroll', queue);
			removeEventListener('resize', queue);
			cancelAnimationFrame(raf);
			clearInterval(t);
		};
	});
</script>

<div bind:this={root} aria-hidden="true" class="drift pointer-events-none absolute inset-0 z-0">
	<div bind:this={layer} class="absolute -inset-[14%] will-change-transform">
		{#each photos as src, i (src)}
			<img
				{src}
				alt=""
				loading="lazy"
				decoding="async"
				class="absolute inset-0 size-full object-cover"
				class:on={i === active}
				style:--dir={i % 2 ? -1 : 1}
			/>
		{/each}
	</div>
</div>

<style>
	.drift {
		opacity: 0.38;
		mix-blend-mode: multiply;
		mask-image: radial-gradient(ellipse 70% 65% at 50% 50%, #000 25%, transparent 100%);
	}
	img {
		opacity: 0;
		transition: opacity 1.6s ease-in-out;
		/* El movimiento corre siempre (también al desvanecerse), así no hay saltos. */
		animation: pan 16s ease-in-out infinite alternate;
	}
	img.on {
		opacity: 1;
	}
	@keyframes pan {
		from {
			transform: scale(1.12) translate(calc(var(--dir) * -2.5%), 1.5%);
		}
		to {
			transform: scale(1.22) translate(calc(var(--dir) * 2.5%), -1.5%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		img {
			animation: none;
			transform: scale(1.12);
		}
	}
</style>
