<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import { nav, scrollToElement, setGate } from '#lib/shared/scroll/lenis.svelte.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import { letter } from './letter.data.ts';

	// closed → opening (la solapa se abre) → shown (la carta sale y se lee)
	let stage = $state<'closed' | 'opening' | 'shown'>('closed');
	let timer: ReturnType<typeof setTimeout> | undefined;
	let btnTimer: ReturnType<typeof setTimeout> | undefined;
	let showContinue = $state(false);

	const CONTINUE_DELAY = 15000; // ms desde que la carta está abierta

	function next() {
		const scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
		const i = scenes.findIndex((s) => s.id === 'carta');
		const target = scenes[i + 1];
		if (!target || nav.locked) return;
		setGate(null); // ya se puede seguir: se quita el tope
		scrollToElement(target);
	}

	// No se puede pasar de la carta hasta pulsar "Continuar".
	onMount(() => setGate('carta'));

	function open() {
		if (stage !== 'closed') return;
		stage = 'opening';
		timer = setTimeout(() => {
			stage = 'shown';
			btnTimer = setTimeout(() => (showContinue = true), CONTINUE_DELAY);
		}, 1100);
	}

	onDestroy(() => {
		clearTimeout(timer);
		clearTimeout(btnTimer);
		setGate(null);
	});
</script>

<Scene id="carta" title="Tu carta" music="carta" manual class="bg-[#f7b3cf]">
	{#if stage !== 'shown'}
		<div use:reveal class="flex flex-col items-center gap-6 text-center">
			<button
				type="button"
				onclick={open}
				disabled={stage === 'opening'}
				aria-label="Abrir la carta"
				class="envelope group relative block aspect-[3/2] w-[min(68vw,300px,39svh)] cursor-pointer {stage ===
				'opening'
					? 'is-open'
					: ''}"
			>
				<!-- fondo del sobre -->
				<span class="env-back absolute inset-0 rounded-[18px] bg-[#f8f5f7]"></span>
				<!-- hoja que sube al abrirse -->
				<span
					class="env-paper absolute inset-x-[6%] top-[8%] bottom-[6%] rounded-[10px] bg-cream shadow-[0_2px_0_rgb(0_0_0/0.08)]"
				></span>
				<!-- bolsillo frontal -->
				<span class="env-front absolute inset-0 rounded-[18px] bg-slate-50"></span>
				<!-- solapa -->
				<span class="env-flap absolute inset-x-0 top-0 h-[58%]">
					<span class="env-flap-face absolute inset-0 bg-white"></span>
				</span>
				<!-- sello de corazón -->
				<span
					class="env-seal absolute top-[58%] left-1/2 z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-plum text-[26px] text-cream shadow-[0_4px_0_var(--color-berry)] transition-transform group-hover:scale-110"
					aria-hidden="true">♥</span
				>
			</button>
			<p class="font-hand text-[30px] leading-none font-bold text-berry horiz:text-[clamp(24px,4svh,34px)]">
				{stage === 'opening' ? '...' : 'Toca para abrir'}
			</p>
		</div>
	{:else}
		<article
			class="letter-pop flex w-full max-w-180 flex-col gap-4 rounded-[28px] bg-cream p-[clamp(24px,6vw,56px)] text-left shadow-[0_10px_0_var(--color-rose-deep)] horiz:gap-[1.8svh] horiz:p-[clamp(24px,5svh,56px)]"
		>
			<p
				class="font-hand text-[44px] leading-none font-bold text-plum horiz:text-[clamp(34px,6svh,52px)]"
			>
				{letter.greeting}
			</p>
			{#each letter.paragraphs as para, i (i)}
				<p
					class="line text-[18px] leading-[1.65] horiz:text-[clamp(15px,2.4svh,20px)]"
					style:--i={i}
				>
					{para}
				</p>
			{/each}
			<p
				class="line mt-1 text-right font-hand text-[32px] font-bold horiz:text-[clamp(26px,4.4svh,38px)]"
				style:--i={letter.paragraphs.length}
			>
				{letter.signoff}<br />{letter.author}
			</p>
		</article>
		<!-- Siempre ocupa su espacio (invisible) para que la carta no salte al aparecer -->
		<button
			type="button"
			onclick={next}
			disabled={!showContinue}
			aria-hidden={!showContinue}
			tabindex={showContinue ? 0 : -1}
			class="continue-btn mt-2 rounded-full bg-plum px-8 py-3 font-hand text-[28px] leading-none font-bold text-cream shadow-[0_5px_0_var(--color-berry)] horiz:text-[clamp(22px,3.6svh,30px)] {showContinue
				? 'is-on cursor-pointer'
				: ''}"
		>
			Continuar
		</button>
		<!-- Celular: margen bajo la carta para que su final pueda subir hasta la mitad de la pantalla
		     (50svh menos el py-24 de la escena y el gap-6 del contenido). -->
		<div aria-hidden="true" class="h-[max(0px,calc(50svh-120px))] shrink-0 horiz:hidden"></div>
	{/if}
</Scene>

<style>
	.env-flap {
		transform-origin: top center;
		transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 10;
		perspective: 600px;
	}
	.env-flap-face {
		clip-path: polygon(0 0, 100% 0, 50% 100%);
		border-radius: 18px 18px 0 0;
		backface-visibility: hidden;
	}
	.env-front {
		clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%);
		z-index: 5;
	}
	.env-paper {
		transition: transform 0.7s 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.env-seal {
		transition:
			transform 0.2s,
			opacity 0.3s;
	}
	.envelope {
		animation: env-bob 3s ease-in-out infinite;
		transition: transform 0.4s;
	}
	.envelope:hover:not(.is-open) {
		transform: rotate(-2deg) scale(1.03);
	}
	.envelope.is-open {
		animation: none;
	}
	.envelope.is-open .env-flap {
		transform: rotateX(180deg);
		z-index: 1;
	}
	.envelope.is-open .env-paper {
		transform: translateY(-45%);
	}
	.envelope.is-open .env-seal {
		opacity: 0;
		pointer-events: none;
	}

	@keyframes env-bob {
		0%,
		100% {
			translate: 0 0;
		}
		50% {
			translate: 0 -8px;
		}
	}

	.letter-pop {
		animation: letter-pop 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	@keyframes letter-pop {
		from {
			opacity: 0;
			transform: translateY(40px) scale(0.6) rotate(-3deg);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.line {
		animation: line-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: calc(0.5s + var(--i) * 0.35s);
	}
	@keyframes line-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.continue-btn {
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 1.2s ease-out,
			transform 0.2s;
	}
	.continue-btn.is-on {
		opacity: 1;
		pointer-events: auto;
	}
	.continue-btn.is-on:hover {
		transform: translateY(-2px);
	}

	@media (prefers-reduced-motion: reduce) {
		.continue-btn {
			transition: none;
		}
		.envelope {
			animation: none;
		}
		.letter-pop,
		.line {
			animation: none;
		}
	}
</style>
