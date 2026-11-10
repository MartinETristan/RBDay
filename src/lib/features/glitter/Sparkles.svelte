<script lang="ts">
	import { scroll } from '#lib/shared/scroll/lenis.svelte.ts';
	import { sparkles } from './glitter.ts';

	/** Versión discreta: menos destellos y más tenues (mientras corre el contador). */
	let { calm = false }: { calm?: boolean } = $props();

	let shown = $derived(calm ? sparkles.slice(0, 14) : sparkles);
</script>

<!-- Glitter fijo sobre toda la pantalla. Con el scroll se desplaza con parallax: cada destello
     tiene una profundidad distinta y se mueve a distinta velocidad (en X en escritorio, en Y en celular). -->
<div
	class="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-1000 {scroll.horizontal
		? 'par-h'
		: 'par-v'} {calm ? 'opacity-50' : 'opacity-100'}"
	style:--s={scroll.y}
	aria-hidden="true"
>
	{#each shown as s, i (i)}
		<div class="glitter" style={s.place}>
			<div class={s.dot ? 'glitter-dot' : 'spark'} style={s.style}></div>
		</div>
	{/each}
</div>
