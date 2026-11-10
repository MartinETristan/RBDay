<script lang="ts">
	import { hearts } from '#lib/fx.ts';
	import { scroll } from '#lib/lenis.svelte.ts';
	import Heart from './Heart.svelte';
</script>

<!-- Corazones azul rey que suben; el scroll suave (Lenis) los desplaza con parallax -->
<div
	class="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
	style:transform="translate3d(0, {scroll.y * 0.25}px, 0)"
	aria-hidden="true"
>
	{#each hearts as h, i (i)}
		<Heart class="rising-heart" style={h.style} />
	{/each}
</div>
