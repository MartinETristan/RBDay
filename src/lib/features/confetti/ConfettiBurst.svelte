<script lang="ts">
	import { confetti } from './confetti.svelte.ts';
</script>

<div class="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
	{#each confetti.batches as batch (batch.id)}
		{#each batch.pieces as style, i (i)}
			<div class="confetti-piece" {style}></div>
		{/each}
	{/each}
</div>
