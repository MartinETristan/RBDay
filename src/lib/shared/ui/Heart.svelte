<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let {
		shine = false,
		color = '#1B2FA8',
		...rest
	}: SVGAttributes<SVGSVGElement> & { shine?: boolean; color?: string } = $props();
</script>

<svg viewBox="0 0 24 22" aria-hidden="true" {...rest}>
	<path
		d="M12 21C5 15.5 1 12 1 7.2 1 4 3.4 1.5 6.5 1.5c2.2 0 4.2 1.2 5.5 3.3 1.3-2.1 3.3-3.3 5.5-3.3C20.6 1.5 23 4 23 7.2 23 12 19 15.5 12 21z"
		fill={color}
	/>
	{#if shine}
		<path
			d="M5 6.5c.4-1.3 1.4-2 2.6-2"
			stroke="#FFF6FA"
			stroke-width="1.2"
			stroke-linecap="round"
			fill="none"
			opacity=".7"
		/>
	{/if}
</svg>
