<script lang="ts">
	import { asset } from '$app/paths';
	import { scrollToTop } from '#lib/shared/scroll/lenis.svelte.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';

	const VIDEO_SRC = asset('videos/impacto.mp4');
	const VIDEO_FILENAME = 'feliz-cumpleanos-25.mp4';

	const buttonClass =
		'inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-2 border-candy bg-transparent px-6 text-lg font-semibold text-candy transition hover:bg-candy hover:text-berry';
</script>

<Scene id="fin" title="Fin" music="fin" class="bg-berry! text-candy">
	<p class="text-[clamp(32px,8vw,56px)] leading-tight font-bold horiz:text-[clamp(32px,7svh,64px)]">
		¡Feliz cumpleaños 25, Amorchito!
	</p>
	<p class="max-w-prose text-[clamp(16px,4.2vw,22px)] leading-relaxed horiz:text-[clamp(16px,3svh,24px)]">
		Si te gustaría volver a verlo, usa el botoncito de abajo para regresar al inicio 🙂‍↕️. 
	</p>
	<p class="max-w-prose text-[clamp(16px,4.2vw,22px)] leading-relaxed horiz:text-[clamp(16px,3svh,24px)]">
		 Y si quieres guardar este recuerdo para compartirlo en tus redes, tienes tambien un botoncito abajo 👇.
	</p>
	<div class="flex flex-wrap items-center justify-center gap-3">
		<button type="button" onclick={scrollToTop} class={buttonClass}>Regresar al inicio</button>
		<a href={VIDEO_SRC} download={VIDEO_FILENAME} class={buttonClass}>Descargar Historia</a>
	</div>
</Scene>
