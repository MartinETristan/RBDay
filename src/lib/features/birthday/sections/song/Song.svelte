<script lang="ts">
	import { tracks } from '#lib/features/player/tracks.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import SceneHeading from '#lib/shared/ui/SceneHeading.svelte';

	const ours = tracks.find((t) => t.role === 'nuestra');
	const together = tracks.filter((t) => t.role === 'juntos');

	// Barras del ecualizador decorativo
	const bars = Array.from({ length: 14 }, (_, i) => ({
		delay: `-${((i * 0.37) % 1.1).toFixed(2)}s`,
		duration: `${(0.8 + ((i * 7) % 5) * 0.12).toFixed(2)}s`
	}));
</script>

<Scene id="cancion" title="Tu canción del año" ghost="♪" class="bg-pink">
	<SceneHeading kicker="por que la musica es vida..." title="Nuestra canción" />

	<div class="flex w-full max-w-5xl flex-col gap-4 horiz:flex-row horiz:items-stretch horiz:gap-6">
		{#if ours}
			<div
				use:reveal
				class="flex flex-1 items-center gap-5 rounded-[28px] bg-cream p-5 text-left shadow-[0_8px_0_var(--color-rose)] horiz:gap-8 horiz:p-8"
			>
				<!-- Disco -->
				<div
					class="spin-slow relative size-24 shrink-0 rounded-full bg-[conic-gradient(var(--color-rose),var(--color-candy),var(--color-rose-deep),var(--color-candy),var(--color-rose))] shadow-[0_5px_0_var(--color-rose-deep)] horiz:size-[24svh]"
					aria-hidden="true"
				>
					<div class="absolute inset-[34%] rounded-full bg-cream"></div>
					<div class="absolute inset-[47%] rounded-full bg-rose-400"></div>
				</div>
				<div class="flex min-w-0 flex-col gap-2">
					<h3
						class="text-[clamp(24px,6vw,36px)] leading-tight font-bold text-berry horiz:text-[clamp(26px,4.6svh,44px)]"
					>
						{ours.title}
					</h3>
					<p class="text-[18px] text-plum">{ours.artist}</p>
					<div class="flex h-8 items-end gap-1" aria-hidden="true">
						{#each bars as b, i (i)}
							<span
								class="eq-bar block h-full w-1.5 rounded-full bg-rose-400"
								style:animation-delay={b.delay}
								style:animation-duration={b.duration}
							></span>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<div
			use:reveal={150}
			class="flex flex-1 flex-col gap-3 rounded-[28px] bg-cream/80 p-5 text-left horiz:justify-center horiz:p-8"
		>
			<p class="font-hand text-[28px] leading-none font-bold text-plum">las que cantamos juntos</p>
			<ul class="flex flex-col gap-2.5">
				{#each together as t (t.title)}
					<li
						class="flex flex-col rounded-2xl bg-cream px-4 py-2.5 shadow-[0_3px_0_var(--color-candy)]"
					>
						<span class="text-[17px] leading-tight font-bold text-berry">{t.title}</span>
						<span class="text-[15px] text-plum">{t.artist}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Scene>
