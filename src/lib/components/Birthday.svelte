<script lang="ts">
	import { reveal } from '#lib/actions.ts';
	import { RELATIONSHIP_START, letter, photos, timeline } from '#lib/data.ts';
	import Heart from './Heart.svelte';
	import RisingHearts from './RisingHearts.svelte';

	let { now, onMoreConfetti }: { now: number; onMoreConfetti: () => void } = $props();

	let daysTogether = $derived(Math.max(0, Math.floor((now - RELATIONSHIP_START) / 86400000)));

	const tilts = [-2.5, 2, -1.5, 2.5, -2, 1.5];
	const tints = ['bg-candy', 'bg-pink', 'bg-pink', 'bg-candy', 'bg-candy', 'bg-pink'];
</script>

<main class="relative">
	<!-- Bienvenida -->
	<section
		class="hero-bg relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-5 py-12 text-center md:px-12"
	>
		<RisingHearts />
		<p class="pop font-hand text-[clamp(30px,8vw,46px)] font-bold text-plum">14 de noviembre</p>
		<h1 class="pop shine max-w-250 text-[clamp(46px,14vw,120px)] leading-[1.05] font-bold">
			¡Feliz cumpleaños!
		</h1>
		<div class="flex flex-wrap items-center justify-center gap-3">
			<span class="text-[clamp(36px,10vw,60px)] font-bold text-plum">Rosario</span>
			<div class="beat relative h-26 w-28">
				<Heart class="h-full w-full" />
				<span
					class="absolute inset-x-0 top-0 flex h-21 items-center justify-center text-[40px] font-bold text-cream"
				>
					25
				</span>
			</div>
		</div>
		<p class="font-hand text-[clamp(30px,7vw,42px)] font-bold text-berry">para mi amorchito</p>
		<button
			type="button"
			onclick={onMoreConfetti}
			class="min-h-12 cursor-pointer rounded-full border-2 border-rose bg-cream px-6 text-lg font-semibold text-berry shadow-[0_5px_0_var(--color-rose)] transition active:translate-y-0.75 active:shadow-[0_2px_0_var(--color-rose)]"
		>
			¡Más confeti!
		</button>
	</section>

	<!-- Nuestra historia -->
	<section class="relative z-10 bg-blush px-5 py-18 md:px-12">
		<div class="mx-auto flex max-w-xl flex-col gap-9">
			<div class="flex flex-col gap-1 text-center" use:reveal>
				<p class="font-hand text-[34px] font-bold text-plum">cómo empezó todo</p>
				<h2 class="text-[clamp(36px,9vw,56px)] leading-[1.1] font-bold">Nuestra historia</h2>
			</div>

			<ol class="flex flex-col pl-3.5">
				{#each timeline as t, i (t.date)}
					<li
						use:reveal={i * 80}
						class="relative flex flex-col gap-1.5 border-l-[3px] pl-7 {i === timeline.length - 1
							? 'border-transparent pb-0'
							: 'border-dashed border-rose pb-9'}"
					>
						<Heart class="absolute top-0 -left-4.5 h-7 w-7.5" />
						<span
							class="self-start rounded-full bg-candy px-3.5 py-1 text-[15px] font-semibold text-berry"
						>
							{t.date}
						</span>
						<h3 class="text-[26px] leading-tight font-bold">{t.title}</h3>
						{#if t.place}
							<p class="text-[17px] text-plum">{t.place}</p>
						{/if}
					</li>
				{/each}
			</ol>

			<p use:reveal class="text-center font-hand text-[34px] font-bold">
				Llevamos {daysTogether} días juntos
			</p>
		</div>
	</section>

	<!-- Galería -->
	<section class="relative z-10 bg-petal px-5 py-18 md:px-12">
		<div class="mx-auto flex max-w-280 flex-col gap-10">
			<div class="flex flex-col gap-1 text-center" use:reveal>
				<p class="font-hand text-[34px] font-bold text-plum">nuestros momentos</p>
				<h2 class="text-[clamp(36px,9vw,56px)] leading-[1.1] font-bold">Galería</h2>
			</div>

			<div class="flex flex-wrap justify-center gap-5">
				{#each photos as p, i (i)}
					<figure
						use:reveal={(i % 3) * 100}
						class="box-border max-w-88 basis-[calc(50%-10px)] md:basis-[calc(33.333%-20px)]"
					>
						<div
							class="rounded-xl bg-white px-2.5 pt-2.5 pb-7.5 shadow-[0_7px_0_var(--color-rose)]"
							style:transform="rotate({tilts[i % tilts.length]}deg)"
						>
							{#if p.src}
								<img
									src={p.src}
									alt={p.alt}
									loading="lazy"
									class="w-full rounded-md object-cover {i % 3 === 1
										? 'aspect-square'
										: 'aspect-4/5'}"
								/>
							{:else}
								<div
									class="flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-plum p-2 text-berry {tints[
										i % tints.length
									]} {i % 3 === 1 ? 'aspect-square' : 'aspect-4/5'}"
								>
									<svg
										width="36"
										height="36"
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
									<span class="text-center text-[15px] font-semibold">{p.label}</span>
								</div>
							{/if}
						</div>
					</figure>
				{/each}
			</div>
		</div>
	</section>

	<!-- Carta -->
	<section class="relative z-10 bg-[#f7b3cf] px-5 py-18 md:px-12">
		<article
			use:reveal
			class="mx-auto flex max-w-180 flex-col gap-4.5 rounded-[28px] bg-cream p-[clamp(24px,6vw,64px)] shadow-[0_10px_0_var(--color-rose-deep)]"
		>
			<p class="font-hand text-[44px] leading-none font-bold text-plum">{letter.greeting}</p>
			{#each letter.paragraphs as para, i (i)}
				<p class="text-[19px] leading-[1.7]">{para}</p>
			{/each}
			<p class="mt-2 text-right font-hand text-[34px] font-bold">
				{letter.signoff}<br />{letter.author}
			</p>
		</article>
	</section>

	<footer
		class="relative z-10 flex flex-col items-center gap-2.5 bg-berry px-6 py-9 text-center text-lg font-medium text-candy"
	>
		<Heart class="h-7.5 w-8" />
		Feliz cumpleaños 25, Rosario
	</footer>
</main>
