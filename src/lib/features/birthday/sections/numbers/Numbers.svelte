<script lang="ts">
	import { countUp } from '#lib/shared/actions/countUp.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Heart from '#lib/shared/ui/Heart.svelte';
	import LazyMap from '#lib/shared/ui/LazyMap.svelte';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import PhotoDrift from '../story/PhotoDrift.svelte';
	import { DATES_START, messages, tripPhotos, trips } from './numbers.data.ts';

	let { now }: { now: number } = $props();

	// Marca los días de la semana uno por uno, cuando terminan las animaciones de texto
	// (la última burbuja entra a ~1.5 s). Al salir de pantalla se desmarcan para repetir.
	const MARK_AFTER = 1700;
	function markDays(node: HTMLElement) {
		let timer: ReturnType<typeof setTimeout>;
		const io = new IntersectionObserver(
			([entry]) => {
				clearTimeout(timer);
				if (entry.isIntersecting) {
					timer = setTimeout(() => node.classList.add('marked'), MARK_AFTER);
				} else {
					node.classList.remove('marked');
				}
			},
			{ threshold: 0.6 }
		);
		io.observe(node);
		return {
			destroy() {
				clearTimeout(timer);
				io.disconnect();
			}
		};
	}

	// Domingos de cita desde el primero (inclusive).
	let sundays = $derived(
		now < DATES_START ? 0 : Math.floor((now - DATES_START) / (7 * 86400000)) + 1
	);

	// Centro y zoom para que quepan todos los viajes en el mapa.
	const lngs = trips.map((t) => t.coords[0]);
	const lats = trips.map((t) => t.coords[1]);
	const tripCenter: [number, number] = [
		(Math.min(...lngs) + Math.max(...lngs)) / 2,
		(Math.min(...lats) + Math.max(...lats)) / 2
	];
	const span = Math.max(Math.max(...lngs) - Math.min(...lngs), 0.5);
	// ~90 px por grado en un mapa de ~250-320 px: ambos lugares caben con margen para sus nombres.
	const tripZoom = Math.log2(360 / span) - 1.5;

	const bigNumber =
		'text-[clamp(120px,40vw,250px)] leading-[0.85] font-bold text-rose-400 tabular-nums horiz:text-[clamp(120px,38svh,330px)]';
	const kicker =
		'font-hand text-[clamp(28px,6vw,40px)] font-bold text-plum horiz:text-[clamp(28px,4.6svh,42px)]';
	const label =
		'text-[clamp(30px,8vw,56px)] leading-[1.05] font-bold text-berry horiz:text-[clamp(30px,6.4svh,64px)]';
	const detail =
		'max-w-xl text-[clamp(18px,4.6vw,24px)] text-plum horiz:text-[clamp(18px,3svh,26px)]';
</script>

<!-- Citas -->
<Scene id="citas" title="Tus domingos" ghost="♥" class="bg-petal">
	{#snippet bg()}
		<Heart
			class="pointer-events-none absolute right-[-8vmin] bottom-[-6vmin] z-0 h-[60vmin] w-[66vmin] opacity-10"
		/>
	{/snippet}
	<p use:reveal class={kicker}>nuestros domingos</p>
	<div use:reveal={120} class={bigNumber}>
		<span use:countUp={{ to: sundays }}>{sundays}</span>
	</div>
	<h2 use:reveal={240} class={label}>domingos de cita</h2>
	<p use:reveal={320} class={detail}>Casi desde que empezamos, cada domingo es nuestro.</p>
</Scene>

<!-- Viajes -->
<Scene id="viajes" title="Tus viajes" ghost={String(trips.length)} class="bg-candy">
	{#snippet bg()}
		<PhotoDrift photos={tripPhotos} />
	{/snippet}
	<p use:reveal class={kicker}>nuestras excursiones</p>
	<div use:reveal={120} class={bigNumber}>
		<span use:countUp={{ to: trips.length }}>{trips.length}</span>
	</div>
	<h2 use:reveal={240} class={label}>viajes juntos</h2>
	<ul class="flex flex-wrap justify-center gap-3">
		{#each trips as trip, i (trip.name)}
			<li
				use:reveal={320 + i * 120}
				class="flex items-center gap-2 rounded-full bg-cream px-5 py-2 text-[18px] font-semibold text-berry shadow-[0_4px_0_var(--color-rose)]"
			>
				<Heart class="h-5 w-5.5" />
				{trip.name}
			</li>
		{/each}
	</ul>
	<div
		use:reveal={460}
		class="-z-10 horiz:absolute horiz:top-1/2 horiz:left-0 horiz:-translate-y-1/2 horiz:-rotate-3"
	>
		<LazyMap
			center={tripCenter}
			zoom={tripZoom}
			places={trips.map((t) => ({ coords: t.coords, label: t.name }))}
			class="h-44 w-[min(82vw,380px)] horiz:h-[clamp(190px,36svh,340px)] horiz:w-[clamp(200px,20vw,320px)]"
		/>
	</div>
</Scene>

<!-- Mensajes -->
<Scene id="mensajes" title="Tus mensajes" ghost="@" class="bg-blush">
	<p use:reveal class={kicker}>nuestras conversaciones son...</p>
	<h2
		use:reveal={120}
		class="text-[clamp(56px,17vw,120px)] leading-[0.95] font-bold text-rose-400 horiz:text-[clamp(56px,17svh,170px)]"
	>
		{messages.big}
	</h2>
	<p use:reveal={240} class={label}>{messages.detail}</p>
	<!-- Una burbuja por día de la semana -->
	<div use:markDays class="week flex gap-2" aria-hidden="true">
		{#each ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as d, i (i)}
			<span
				use:reveal={320 + i * 70}
				style:--i={i}
				class="day flex size-10 items-center justify-center rounded-full bg-cream text-[15px] font-bold text-rose-400 shadow-[0_3px_0_var(--color-rose)]"
			>
				{d}
			</span>
		{/each}
	</div>
</Scene>

<style>
	/* .reveal ya anima opacity/transform; aquí se anima el "marcado" por separado. */
	.day {
		transition:
			opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
			background-color 0.3s ease,
			color 0.3s ease;
	}
	.week:global(.marked) .day {
		animation: day-mark 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
		animation-delay: calc(var(--i) * 130ms);
	}
	@keyframes day-mark {
		0% {
			background-color: var(--color-cream);
			color: var(--color-rose-deep);
			transform: scale(1);
		}
		60% {
			transform: scale(1.3);
		}
		100% {
			background-color: var(--color-rose-deep);
			color: var(--color-cream);
			transform: scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.week:global(.marked) .day {
			animation-duration: 0.01s;
		}
	}
</style>
