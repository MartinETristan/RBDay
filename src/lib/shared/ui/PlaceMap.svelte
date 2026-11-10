<script lang="ts">
	import Heart from '#lib/shared/ui/Heart.svelte';
	import { Map, MapMarker, MarkerContent, MarkerLabel } from '#lib/components/ui/map/index.ts';

	export type Place = { coords: [number, number]; label?: string };

	/** Mapa fijo con un corazón por lugar. Se carga aparte (maplibre pesa ~1 MB) desde `LazyMap`. */
	let { center, zoom, places }: { center: [number, number]; zoom: number; places: Place[] } =
		$props();

	const VOYAGER = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
</script>

<Map
	theme="light"
	{center}
	{zoom}
	styles={{ light: VOYAGER, dark: VOYAGER }}
	class="size-full overflow-hidden rounded-lg"
	options={{ interactive: false, attributionControl: false }}
>
	{#each places as p (p.coords.join())}
		<MapMarker longitude={p.coords[0]} latitude={p.coords[1]}>
			<MarkerContent>
				<Heart color="#e58ab4" class="h-8 w-9 drop-shadow" />
				{#if p.label}
					<MarkerLabel
						position="bottom"
						class="rounded-full bg-cream/90 px-2 py-0.5 text-[13px] font-bold text-berry shadow"
					>
						{p.label}
					</MarkerLabel>
				{/if}
			</MarkerContent>
		</MapMarker>
	{/each}
</Map>
