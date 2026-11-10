<script lang="ts">
	import { hearts } from './hearts.ts';
	import { scroll } from '#lib/shared/scroll/lenis.svelte.ts';
	import Heart from '#lib/shared/ui/Heart.svelte';
</script>

<!-- Corazones azul rey que suben; el scroll suave (Lenis) los desplaza con parallax -->
<div
	class="pointer-events-none absolute inset-0 z-5 overflow-hidden"
	style:transform={scroll.horizontal
		? `translate3d(${scroll.y * 0.25}px, 0, 0)`
		: `translate3d(0, ${scroll.y * 0.25}px, 0)`}
	aria-hidden="true"
>
	{#each hearts as h, i (i)}
		<Heart class="rising-heart" style={h.style} />
	{/each}
</div>
