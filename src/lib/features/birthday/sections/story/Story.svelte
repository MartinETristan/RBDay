<script lang="ts">
	import { countUp } from '#lib/shared/actions/countUp.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Heart from '#lib/shared/ui/Heart.svelte';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import LazyMap from '#lib/shared/ui/LazyMap.svelte';
	import PhotoDrift from './PhotoDrift.svelte';
	import { timeline } from './story.data.ts';

	let { now }: { now: number } = $props();

	const months = [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre'
	];
	const tones = ['bg-blush', 'bg-candy', 'bg-petal', 'bg-pink'];

	let chapters = $derived(
		timeline.map((t) => {
			const d = new Date(t.at);
			return {
				...t,
				day: d.getDate(),
				month: months[d.getMonth()],
				year: d.getFullYear(),
				daysAgo: Math.max(0, Math.floor((now - t.at) / 86400000))
			};
		})
	);
</script>

<!-- Un capítulo (escena) por cada fecha importante -->
{#each chapters as c, i (c.date)}
	<Scene
		id="capitulo-{i + 1}"
		title={c.title}
		intro
		ghost={String(i + 1).padStart(2, '0')}
		class={tones[i % tones.length]}
	>
		{#snippet bg()}
			{#if c.photos.length}
				<PhotoDrift photos={c.photos} />
			{/if}
		{/snippet}
		<p
			use:reveal
			data-intro-target
			class="font-hand text-[clamp(28px,6vw,40px)] font-bold text-plum horiz:text-[clamp(28px,4.6svh,42px)]"
		>
			Capítulo {i + 1}
		</p>

		<div use:reveal={120} class="flex items-center justify-center gap-4 text-rose-400">
			<span
				class="text-[clamp(120px,40vw,250px)] leading-[0.85] font-bold horiz:text-[clamp(120px,38svh,330px)]"
			>
				{c.day}
			</span>
			<span class="flex flex-col items-start text-left">
				<span
					class="text-[clamp(28px,8vw,52px)] font-bold text-berry capitalize horiz:text-[clamp(28px,7svh,64px)]"
				>
					{c.month}
				</span>
				<span
					class="text-[clamp(22px,6vw,40px)] font-semibold text-plum horiz:text-[clamp(22px,5svh,44px)]"
				>
					{c.year}
				</span>
			</span>
		</div>

		<h2
			use:reveal={240}
			class="text-[clamp(34px,9vw,60px)] leading-[1.05] font-bold text-berry horiz:text-[clamp(34px,7svh,68px)]"
		>
			{c.title}
		</h2>
		{#if c.place}
			<p
				use:reveal={300}
				class="text-[clamp(18px,4.6vw,24px)] text-plum horiz:text-[clamp(18px,3svh,26px)]"
			>
				{c.place}
			</p>
		{/if}

		<p
			use:reveal={380}
			class="flex items-center gap-2 rounded-full bg-cream px-5 py-2 text-[17px] font-semibold text-berry shadow-[0_4px_0_var(--color-rose)]"
		>
			<Heart class="h-5 w-5.5" />
			hace <span use:countUp={{ to: c.daysAgo }} class="tabular-nums">{c.daysAgo}</span> días
		</p>
		{#if c.coords}
			<div
				use:reveal={460}
				class="-z-10 horiz:absolute horiz:top-1/2 horiz:left-0 horiz:-translate-y-1/2 horiz:-rotate-3"
			>
				<LazyMap
					center={c.coords}
					zoom={16}
					places={[{ coords: c.coords }]}
					class="h-44 w-[min(82vw,380px)] horiz:h-[clamp(190px,36svh,340px)] horiz:w-[clamp(200px,20vw,320px)]"
				/>
			</div>
		{/if}
	</Scene>
{/each}
