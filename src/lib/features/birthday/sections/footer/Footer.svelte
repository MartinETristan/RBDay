<script lang="ts">
	import { scrollToTop } from '#lib/shared/scroll/lenis.svelte.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
</script>

<Scene id="fin" title="Fin" music="fin" class="bg-berry! text-candy">
	<p class="text-[clamp(32px,8vw,56px)] leading-tight font-bold horiz:text-[clamp(32px,7svh,64px)]">
		¡Feliz cumpleaños 25, Amorchito!
	</p>
	<p class="text-[clamp(32px,8vw,56px)] leading-tight horiz:text-[clamp(32px,7svh,64px)]">
		Si te gustaria vovler a ver todo, usa el botoncito de abajo
	</p>
	<button
		type="button"
		onclick={scrollToTop}
		class="min-h-12 cursor-pointer rounded-full border-2 border-candy bg-transparent px-6 text-lg font-semibold text-candy transition hover:bg-candy hover:text-berry"
	>
		Regresar al inicio
	</button>
</Scene>
