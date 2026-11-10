<script lang="ts" module>
	import type { Component } from 'svelte';
	import type { Place } from './PlaceMap.svelte';

	type MapProps = { center: [number, number]; zoom: number; places: Place[] };

	// maplibre (+ WebGL) va en un chunk aparte que se descarga una sola vez, al primer mapa visible.
	let loader: Promise<Component<MapProps>> | null = null;
	const loadMap = () => (loader ??= import('./PlaceMap.svelte').then((m) => m.default));
</script>

<script lang="ts">
	/**
	 * Tarjeta de mapa que solo se crea cuando su escena se acerca a la pantalla
	 * (así no se crean todos los contextos WebGL al cargar la página).
	 * `class`: tamaño y posición de la tarjeta.
	 */
	let { class: className = '', ...props }: MapProps & { class?: string } = $props();

	let PlaceMap = $state<Component<MapProps> | null>(null);

	const nearView = (node: HTMLElement) => {
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;
				io.disconnect();
				loadMap().then((c) => (PlaceMap = c));
			},
			{ rootMargin: '100%' }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	};
</script>

<div use:nearView class="rounded-xl bg-white p-1.5 shadow-[0_6px_0_var(--color-rose)] {className}">
	{#if PlaceMap}
		<PlaceMap {...props} />
	{/if}
</div>
