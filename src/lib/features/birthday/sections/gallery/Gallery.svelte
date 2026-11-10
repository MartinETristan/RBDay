<script lang="ts">
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import SceneHeading from '#lib/shared/ui/SceneHeading.svelte';
	import { photos } from './gallery.data.ts';

	const tilts = [-3, 2, -1.5, 3, -2, 1.5];
	const tints = ['bg-candy', 'bg-pink', 'bg-pink', 'bg-candy', 'bg-candy', 'bg-pink'];
</script>

<Scene id="galeria" title="Tus momentos" ghost="♥" class="bg-blush">
	<SceneHeading kicker="nuestros momentos del año" title="Galería" />

	<div class="grid w-full max-w-6xl grid-cols-2 gap-4 horiz:grid-cols-6 horiz:gap-5">
		{#each photos as p, i (i)}
			<figure use:reveal={i * 90}>
				<div
					class="rounded-xl bg-white px-2 pt-2 pb-6 shadow-[0_6px_0_var(--color-rose)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-0!"
					style:transform="rotate({tilts[i % tilts.length]}deg)"
				>
					{#if p.src}
						<img
							src={p.src}
							alt={p.alt}
							loading="lazy"
							class="aspect-4/5 w-full rounded-md object-cover"
						/>
					{:else}
						<div
							class="flex aspect-4/5 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-plum p-2 text-berry {tints[
								i % tints.length
							]}"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<rect x="3" y="4" width="18" height="16" rx="3" />
								<circle cx="9" cy="10" r="2" />
								<path d="M21 16l-5-5-9 9" />
							</svg>
							<span class="text-center text-[14px] font-semibold">{p.label}</span>
						</div>
					{/if}
				</div>
			</figure>
		{/each}
	</div>
</Scene>
