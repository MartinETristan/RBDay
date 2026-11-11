<script lang="ts">
	import { words } from '#lib/shared/actions/words.ts';
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
</script>

<Scene id="bienvenida" title="Bienvenida" music="bienvenida" seconds={20} class="pastel-bg">
	<div use:reveal class="flex max-w-160 flex-col items-center gap-5 horiz:gap-[2.5svh]">
		<p
			use:words={300}
			class="font-hand text-[clamp(34px,9vw,52px)] leading-none font-bold text-rose-300 horiz:text-[clamp(34px,6svh,52px)]"
		>
			Bienvenida, amorchito
		</p>
		<p
			use:words={1100}
			class="text-[clamp(18px,4.6vw,24px)] leading-[1.65] font-semibold text-plum horiz:text-[clamp(16px,2.8svh,24px)]"
		>
			Hoy en tu cumpleaños quise hacerte este pequeño detalle con todo mi corazón para celebrar un año más de tu vida y recordar todo lo que hemos caminado juntos.
		</p>
		<p
			use:words={3800}
			class="font-hand text-[clamp(28px,7vw,40px)] font-bold text-rose-400 horiz:text-[clamp(26px,4.6svh,40px)]"
		>
			Pero primero, un recap. de como comenzó todo…
		</p>
	</div>
</Scene>
