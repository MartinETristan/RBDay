<script lang="ts">
	import { confetti } from '#lib/fx.ts';

	/** Cambia este número para volver a lanzar el confeti. */
	let { run = 0 }: { run?: number } = $props();
</script>

<div class="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
	{#key run}
		{#each confetti as style, i (i)}
			<div class="confetti-piece" {style}></div>
		{/each}
	{/key}
</div>
