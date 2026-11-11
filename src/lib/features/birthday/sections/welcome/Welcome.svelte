<script lang="ts">
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
</script>

<Scene id="bienvenida" title="Bienvenida" music="bienvenida" seconds={30} class="pastel-bg">
	<div use:reveal class="flex max-w-160 flex-col items-center gap-5 horiz:gap-[2.5svh]">
		<p
			class="font-hand text-[clamp(34px,9vw,52px)] leading-none font-bold text-rose-300 horiz:text-[clamp(34px,6svh,52px)]"
		>
			Bienvenida, amorchito
		</p>
		<p
			class="text-[clamp(18px,4.6vw,24px)] leading-[1.65] font-semibold text-plum horiz:text-[clamp(16px,2.8svh,24px)]"
		>
			Hay días que uno quisiera guardar en un frasco, y a tu lado casi todos lo son. Hoy quise
			hacerte un pequeño regalo hecho de recuerdos, para que veas lo bonito que ha sido
			caminar juntos este tiempo.
		</p>
		<p
			class="font-hand text-[clamp(28px,7vw,40px)] font-bold text-rose-400 horiz:text-[clamp(26px,4.6svh,40px)]"
		>
			Empecemos…
		</p>
	</div>
</Scene>
