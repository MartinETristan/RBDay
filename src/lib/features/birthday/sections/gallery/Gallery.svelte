<script lang="ts">
	import { untrack } from 'svelte';
	import { playInView } from '#lib/shared/actions/playInView.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import SceneHeading from '#lib/shared/ui/SceneHeading.svelte';
	import { player } from '#lib/features/player/player.svelte.ts';
	import { lockNavigation } from '#lib/shared/scroll/lenis.svelte.ts';
	import { galleryPages, type GalleryItem } from './gallery.data.ts';

	/** Elemento abierto en primer plano. */
	let selected = $state<GalleryItem | null>(null);

	// Con el visor abierto se pausa el avance automático y se bloquea la navegación.
	// Solo depende de `selected`: `untrack` evita que leer/escribir `player.playing` vuelva a
	// disparar el efecto (si no, la limpieza lo restaura, el efecto lo apaga… en bucle infinito).
	$effect(() => {
		if (!selected) return;
		return untrack(() => {
			const wasPlaying = player.playing;
			player.playing = false;
			lockNavigation(true);
			return () => {
				lockNavigation(false);
				player.playing = wasPlaying;
			};
		});
	});

	const modal = (node: HTMLDialogElement) => node.showModal();

	const tilts = [-3, 2, -1.5, 3, -2, 1.5];
	const tones = ['bg-blush', 'bg-petal', 'bg-candy', 'bg-blush'];
</script>

{#each galleryPages as { kind, items }, page (page)}
	<Scene
		id="galeria-{page + 1}"
		unit="galeria"
		title="Tus momentos"
		ghost="♥"
		class={tones[page % tones.length]}
	>
		{#if kind === 'ella'}
			<SceneHeading kicker="y la mejor parte..." title="Tú" />
		{:else}
			<SceneHeading
				kicker="nuestros momentos del año · {page + 1}/{galleryPages.length - 1}"
				title="Galería"
			/>
		{/if}

		<div
			class="grid w-full gap-4 horiz:gap-5 {kind === 'ella'
				? 'max-w-3xl grid-cols-2 horiz:grid-cols-4'
				: 'max-w-6xl grid-cols-2 horiz:grid-cols-6'}"
		>
			{#each items as p, i (p.src)}
				<figure use:reveal={i * 90}>
					<button
						type="button"
						aria-label="Ver en grande: {p.alt}"
						onclick={() => (selected = p)}
						class="block w-full cursor-pointer rounded-xl bg-white px-2 pt-2 pb-1.5 shadow-[0_6px_0_var(--color-rose)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0!"
						style:transform="rotate({tilts[i % tilts.length]}deg)"
					>
						{#if p.type === 'video'}
							<video
								src={p.src}
								aria-label={p.alt}
								muted
								loop
								playsinline
								preload="none"
								use:playInView
								class="aspect-4/5 w-full rounded-md object-cover"
							></video>
						{:else}
							<img
								src={p.src}
								alt={p.alt}
								loading="lazy"
								decoding="async"
								class="aspect-4/5 w-full rounded-md object-cover"
							/>
						{/if}
						<span class="block min-h-6 pt-1 font-hand text-lg leading-none font-bold text-plum">
							{p.date ?? ''}
						</span>
					</button>
				</figure>
			{/each}
		</div>
	</Scene>
{/each}

{#if selected}
	<dialog
		use:modal
		onclose={() => (selected = null)}
		onclick={(e) => e.currentTarget.close()}
		aria-label={selected.alt}
		class="m-auto cursor-pointer max-h-[92svh] w-[min(92vw,560px)] overflow-visible rounded-2xl bg-transparent p-0 backdrop:bg-berry/70 backdrop:backdrop-blur-sm"
	>
		<div class="lightbox rounded-2xl bg-white px-3 pt-3 pb-5 shadow-[0_8px_0_var(--color-rose)]">
			{#if selected.type === 'video'}
				<video
					src={selected.src}
					aria-label={selected.alt}
					autoplay
					muted
					loop
					playsinline
					class="mx-auto block h-auto max-h-[68svh] w-auto max-w-full rounded-2xl"
				></video>
			{:else}
				<img
					src={selected.src}
					alt={selected.alt}
					decoding="async"
					class="mx-auto block h-auto max-h-[68svh] w-auto max-w-full rounded-2xl"
				/>
			{/if}
			{#if selected.date || selected.text}
				<div class="px-2 pt-3 text-center">
					{#if selected.date}
						<p class="font-hand text-3xl font-bold text-plum">{selected.date}</p>
					{/if}
					{#if selected.text}
						<p class="mt-1 text-base whitespace-pre-line text-berry">{selected.text}</p>
					{/if}
				</div>
			{/if}
		</div>
	</dialog>
{/if}

<style>
	.lightbox {
		animation: pop 0.25s ease-out;
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.9) rotate(-2deg);
		}
	}
</style>
