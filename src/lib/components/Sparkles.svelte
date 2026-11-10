<script lang="ts">
	import { sparkles } from '#lib/fx.ts';

	/** Versión discreta: menos destellos y más tenues (mientras corre el contador). */
	let { calm = false }: { calm?: boolean } = $props();

	let shown = $derived(calm ? sparkles.slice(0, 14) : sparkles);
</script>

<!-- Glitter fijo sobre toda la pantalla -->
<div
	class="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-1000 {calm
		? 'opacity-50'
		: 'opacity-100'}"
	aria-hidden="true"
>
	{#each shown as s, i (i)}
		<div class={s.dot ? 'glitter-dot' : 'spark'} style={s.style}></div>
	{/each}
</div>
