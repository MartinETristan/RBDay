<script lang="ts">
	import RisingHearts from '#lib/features/hearts/RisingHearts.svelte';
	import { launchConfetti } from '#lib/features/confetti/confetti.svelte.ts';
	import { startMusic } from '#lib/features/player/music.svelte.ts';
	import { player } from '#lib/features/player/player.svelte.ts';
	import { lockNavigation, scrollToElement } from '#lib/shared/scroll/lenis.svelte.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';

	/** Inicia la música y el modo historia (cada escena dura 15 s) desde el primer capítulo. */
	function start() {
		lockNavigation(false);
		startMusic();
		player.playing = true;
		const first = document.getElementById('capitulo-1');
		if (first) scrollToElement(first);
	}
</script>

<Scene id="inicio" title="Inicio" class="pastel-bg">
	{#snippet bg()}
		<RisingHearts />
		<!-- Cinta de texto en movimiento -->
		<div
			class="absolute inset-x-0 bottom-5 z-10 overflow-hidden whitespace-nowrap"
			aria-hidden="true"
		>
			<div class="marquee flex w-max text-[clamp(20px,4svh,34px)] font-bold text-rose-300/80">
				{#each [0, 1] as n (n)}
					<span class="pr-8">
						FELIZ CUMPLEAÑOS · 25 · FELIZ CUMPLEAÑOS · 25 · FELIZ CUMPLEAÑOS · 25 · FELIZ CUMPLEAÑOS
						· 25 ·
					</span>
				{/each}
			</div>
		</div>
	{/snippet}

	<p
		class="pop font-hand text-[clamp(30px,8vw,46px)] font-bold text-rose-300 horiz:text-[clamp(30px,5svh,46px)]"
	>
		14 de noviembre
	</p>
	<h1
		class="pop max-w-250 text-[clamp(46px,14vw,120px)] leading-[1.05] font-bold text-rose-400 horiz:max-w-none horiz:text-[min(14svh,8vw)]"
	>
		¡Feliz cumpleaños!
	</h1>
	<span
		class="text-[clamp(56px,16vw,110px)] leading-none font-bold text-rose-400 horiz:text-[min(11svh,6vw)]"
	>
		25
	</span>
	<p
		class="font-hand text-[clamp(30px,7vw,42px)] font-bold text-rose-400 horiz:text-[clamp(30px,5svh,46px)]"
	>
		para mi amorchito
	</p>

	<button
		type="button"
		onclick={start}
		class="relative z-10 mt-4 min-h-12 cursor-pointer rounded-full bg-rose-400 px-10 text-xl font-bold text-cream shadow-[0_5px_0_var(--color-plum)] transition active:translate-y-0.75 active:shadow-[0_2px_0_var(--color-plum)]"
	>
		Iniciar
	</button>

	<button
		type="button"
		onclick={launchConfetti}
		class="relative z-10 min-h-12 cursor-pointer rounded-full border-2 border-rose bg-cream px-6 text-lg font-semibold text-rose shadow-[0_5px_0_var(--color-rose)] transition active:translate-y-0.75 active:shadow-[0_2px_0_var(--color-rose)]"
	>
		¡Más confeti!
	</button>

	<p class="mt-2 text-[17px] font-semibold text-plum">Pulsa «Iniciar» para comenzar</p>
</Scene>
