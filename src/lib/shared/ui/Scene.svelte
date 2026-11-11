<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { INTRO_RELEASE } from '#lib/shared/actions/afterIntro.ts';

	/**
	 * Una "escena" a pantalla completa (como una historia de Wrapped).
	 * Escritorio: ocupa toda la pantalla en el scroll horizontal. Celular: bloque vertical.
	 * `ghost`: texto gigante de fondo. `bg`: capa decorativa detrás del contenido.
	 */
	let {
		id,
		title,
		ghost,
		unit,
		music,
		seconds,
		manual = false,
		narrow = false,
		intro,
		class: className = '',
		bg,
		children
	}: {
		id: string;
		title: string;
		ghost?: string;
		/** Agrupa escenas para la música: las que comparten `unit` cuentan como una sola. */
		unit?: string;
		/** Clave de la canción fija de esta escena (ver `tracks.ts`). */
		music?: string;
		/** Duración en el modo historia (por defecto SCENE_SECONDS). */
		seconds?: number;
		/** Si es true, el modo historia no avanza solo desde esta escena. */
		manual?: boolean;
		narrow?: boolean;
		/**
		 * Entrada de grupo: al llegar, el título real de la escena (el elemento con `data-intro-target`)
		 * se ve centrado y grande sobre fondo rosa, quieto `HOLD` ms; luego el rosa se desvanece mientras
		 * el título viaja a su sitio (FLIP) y el resto del contenido aparece. Solo en la 1.ª escena del grupo.
		 */
		intro?: boolean;
		class?: string;
		bg?: Snippet;
		children: Snippet;
	} = $props();

	const HOLD = 1000; // ms con el título quieto al centro
	const MOVE = 1400; // ms del viaje del título + desvanecido del rosa
	const TOTAL = HOLD + MOVE;
	const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'; // ease-in-out suave

	let section: HTMLElement;
	let backdrop = $state<HTMLElement>();

	onMount(() => {
		const target = section.querySelector<HTMLElement>('[data-intro-target]');
		const bgEl = backdrop;
		if (!intro || !target || !bgEl || matchMedia('(prefers-reduced-motion: reduce)').matches)
			return;

		let anims: Animation[] = [];
		let timer = 0;
		let state: 'primed' | 'playing' | 'done' = 'done';

		const stop = () => {
			clearTimeout(timer);
			for (const a of anims) a.cancel();
			anims = [];
		};

		/** Deja el título centrado y en pausa (fuera de pantalla), listo para cuando se llegue a la escena. */
		function prime() {
			stop();
			// Con `hold`, el CSS deja al título sin el desplazamiento de `reveal`: medimos su sitio real.
			section.dataset.intro = 'hold';
			const s = section.getBoundingClientRect();
			const t = target!.getBoundingClientRect();
			if (!t.width || !t.height) return finish();
			// Centro de la parte visible de la escena (en celular puede ser más alta que la pantalla).
			const h = Math.min(s.height, innerHeight);
			// Grande respecto a la pantalla (mín. 1.4×), pero sin salirse de lo ancho (títulos largos).
			const want = Math.max(1.4, Math.min((s.width * 0.8) / t.width, (h * 0.22) / t.height));
			const k = Math.max(1, Math.min(want, (s.width * 0.92) / t.width));
			const dx = s.left + s.width / 2 - (t.left + t.width / 2);
			const dy = s.top + h / 2 - (t.top + t.height / 2);
			const from = `translate(${dx}px, ${dy}px) scale(${k})`;
			const color = getComputedStyle(target!).color;
			const e = HOLD / TOTAL;

			// Línea de tiempo lineal: el easing va por tramo para que el `HOLD` dure exactamente lo que dice.
			anims = [
				target!.animate(
					[
						{ transform: from, color: '#fff' },
						{ transform: from, color: '#fff', offset: e, easing: EASE },
						{ transform: 'none', color }
					],
					{ duration: TOTAL, fill: 'both' }
				),
				bgEl!.animate(
					[
						{ opacity: 1 },
						{ opacity: 1, offset: e + (1 - e) * 0.1, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
						{ opacity: 0, offset: e + (1 - e) * 0.85 },
						{ opacity: 0 }
					],
					{ duration: TOTAL, fill: 'both' }
				)
			];
			for (const a of anims) a.pause();
			anims[0].finished.then(finish, () => {});
			state = 'primed';
		}

		function play() {
			if (state !== 'primed') return;
			state = 'playing';
			for (const a of anims) a.play();
			// El resto del contenido entra (con su `reveal`) cuando el título ya va llegando.
			timer = window.setTimeout(
				() => {
					section.dataset.intro = 'release';
					section.dispatchEvent(new Event(INTRO_RELEASE));
				},
				HOLD + MOVE * 0.5
			);
		}

		function finish() {
			state = 'done';
			section.dataset.intro = 'done';
			// El último fotograma es idéntico al estado natural, así que quitar la animación no salta.
			stop();
		}

		let full = false;
		const io = new IntersectionObserver(
			(entries) => {
				for (const en of entries) {
					const r = en.intersectionRect;
					full =
						en.intersectionRatio >= 0.6 ||
						(r.width >= innerWidth * 0.6 && r.height >= innerHeight * 0.6);
					if (full) play();
					else if (!en.isIntersecting && state !== 'primed') prime();
				}
			},
			{ threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
		);

		// Re-medir si cambia el tamaño o terminan de cargar las fuentes (solo si aún no se ha visto).
		let raf = 0;
		const remeasure = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				if (state === 'primed') prime();
				if (full) play();
			});
		};

		prime();
		io.observe(section);
		addEventListener('resize', remeasure);
		document.fonts?.ready.then(remeasure);

		return () => {
			io.disconnect();
			removeEventListener('resize', remeasure);
			cancelAnimationFrame(raf);
			stop();
			delete section.dataset.intro;
		};
	});
</script>

<section
	bind:this={section}
	{id}
	data-scene
	data-title={title}
	data-unit={unit}
	data-music={music}
	data-seconds={seconds}
	data-manual={manual ? '' : undefined}
	class="scene-circles relative z-10 flex min-h-svh w-full shrink-0 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center horiz:h-svh horiz:min-h-0 horiz:px-16 horiz:py-16 {narrow
		? 'horiz:w-[70vw]'
		: 'horiz:w-screen'} {className}"
>
	{#if ghost}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-[min(70vw,60svh)] leading-none font-bold text-white/30 select-none"
		>
			{ghost}
		</span>
	{/if}

	{@render bg?.()}

	{#if intro}
		<div
			bind:this={backdrop}
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 z-9 bg-rose opacity-0"
		></div>
	{/if}

	<div
		data-scene-content
		class="relative z-10 flex w-full max-w-6xl flex-col items-center gap-6 horiz:gap-[3svh]"
	>
		{@render children()}
	</div>
</section>
