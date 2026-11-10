<script lang="ts">
	import { playInView } from '#lib/shared/actions/playInView.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import SceneHeading from '#lib/shared/ui/SceneHeading.svelte';
	import { galleryPages } from './gallery.data.ts';

	const tilts = [-3, 2, -1.5, 3, -2, 1.5];
	const tones = ['bg-blush', 'bg-petal', 'bg-candy', 'bg-blush'];
</script>

{#each galleryPages as { kind, items }, page (page)}
	<Scene id="galeria-{page + 1}" title="Tus momentos" ghost="♥" class={tones[page % tones.length]}>
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
					<div
						class="rounded-xl bg-white px-2 pt-2 pb-6 shadow-[0_6px_0_var(--color-rose)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0!"
						style:transform="rotate({tilts[i % tilts.length]}deg)"
					>
						{#if p.type === 'video'}
							<video
								src={p.src}
								aria-label={p.alt}
								muted
								loop
								playsinline
								preload="metadata"
								use:playInView
								class="aspect-4/5 w-full rounded-md object-cover"
							></video>
						{:else}
							<img
								src={p.src}
								alt={p.alt}
								loading="lazy"
								class="aspect-4/5 w-full rounded-md object-cover"
							/>
						{/if}
					</div>
				</figure>
			{/each}
		</div>
	</Scene>
{/each}
