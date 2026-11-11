<script lang="ts" module>
	import { musicForKey, startMusic } from '#lib/features/player/music.svelte.ts';

	/** Canción de fondo del contador (bg-fondo.mp3). Llamar desde un gesto (clic/tecla). */
	export function startCountdownMusic() {
		musicForKey('bienvenida');
		startMusic();
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { music, startOnGesture } from '#lib/features/player/music.svelte.ts';

	/** Milisegundos que faltan. */
	let { remaining }: { remaining: number } = $props();

	// El navegador bloquea el audio hasta que la persona interactúa:
	// arranca con el primer toque, clic o tecla que el navegador acepte.
	onMount(() => {
		if (music.started) return;
		return startOnGesture(startCountdownMusic);
	});

	const pad = (n: number) => String(n).padStart(2, '0');

	let units = $derived.by(() => {
		const s = Math.floor(Math.max(0, remaining) / 1000);
		return [
			{ value: pad(Math.floor(s / 86400)), label: 'Días' },
			{ value: pad(Math.floor((s % 86400) / 3600)), label: 'Horas' },
			{ value: pad(Math.floor((s % 3600) / 60)), label: 'Min' },
			{ value: pad(s % 60), label: 'Seg' }
		];
	});
</script>

<section
	class="calm-bg relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden px-5 py-12 text-center md:px-12"
>
	<div class="flex max-w-xl flex-col gap-3">
		<p class="text-base font-semibold tracking-[0.16em] text-plum uppercase">
			Algo muy especial se acerca
		</p>
		<h1 class="text-[clamp(40px,11vw,76px)] leading-[1.1] font-bold text-berry">
			Falta muy poquito, amorchito
		</h1>
	</div>

	<div class="flex w-full max-w-190 flex-wrap justify-center gap-4" role="timer" aria-live="off">
		{#each units as u (u.label)}
			<div
				class="flex max-w-45 basis-[calc(50%-8px)] flex-col items-center gap-0.5 rounded-[26px] border-2 border-petal bg-cream/80 px-2 pt-5 pb-3.5 text-berry shadow-[0_6px_0_var(--color-candy)] md:basis-42"
			>
				<span class="text-[clamp(52px,16vw,80px)] leading-none font-bold tabular-nums">
					{u.value}
				</span>
				<span class="text-[15px] font-semibold tracking-widest text-plum uppercase">
					{u.label}
				</span>
			</div>
		{/each}
	</div>
</section>
