<script lang="ts">
	import { countUp } from '#lib/shared/actions/countUp.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Heart from '#lib/shared/ui/Heart.svelte';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import { DATES_START, messages, trips } from './numbers.data.ts';

	let { now }: { now: number } = $props();

	// Domingos de cita desde el primero (inclusive).
	let sundays = $derived(
		now < DATES_START ? 0 : Math.floor((now - DATES_START) / (7 * 86400000)) + 1
	);

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
<Scene id="viajes" title="Tus viajes" ghost="2" class="bg-candy">
	<p use:reveal class={kicker}>nuestros excursiones</p>
	<div use:reveal={120} class={bigNumber}>
		<span use:countUp={{ to: trips.length }}>{trips.length}</span>
	</div>
	<h2 use:reveal={240} class={label}>viajes juntos</h2>
	<ul class="flex flex-wrap justify-center gap-3">
		{#each trips as trip, i (trip)}
			<li
				use:reveal={320 + i * 120}
				class="flex items-center gap-2 rounded-full bg-cream px-5 py-2 text-[18px] font-semibold text-berry shadow-[0_4px_0_var(--color-rose)]"
			>
				<Heart class="h-5 w-5.5" />
				{trip}
			</li>
		{/each}
	</ul>
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
	<div class="flex gap-2" aria-hidden="true">
		{#each ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as d, i (i)}
			<span
				use:reveal={320 + i * 70}
				class="flex size-10 items-center justify-center rounded-full bg-cream text-[15px] font-bold text-rose-400 shadow-[0_3px_0_var(--color-rose)]"
			>
				{d}
			</span>
		{/each}
	</div>
</Scene>
