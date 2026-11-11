<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Una "escena" a pantalla completa (como una historia de Wrapped).
	 * Escritorio: ocupa toda la pantalla en el scroll horizontal. Celular: bloque vertical.
	 * `ghost`: texto gigante de fondo. `bg`: capa decorativa detrás del contenido.
	 */
	let {
		id,
		title,
		ghost,
		unit,
		music,
		seconds,
		manual = false,
		narrow = false,
		class: className = '',
		bg,
		children
	}: {
		id: string;
		title: string;
		ghost?: string;
		/** Agrupa escenas para la música: las que comparten `unit` cuentan como una sola. */
		unit?: string;
		/** Clave de la canción fija de esta escena (ver `tracks.ts`). */
		music?: string;
		/** Duración en el modo historia (por defecto SCENE_SECONDS). */
		seconds?: number;
		/** Si es true, el modo historia no avanza solo desde esta escena. */
		manual?: boolean;
		narrow?: boolean;
		class?: string;
		bg?: Snippet;
		children: Snippet;
	} = $props();
</script>

<section
	{id}
	data-scene
	data-title={title}
	data-unit={unit}
	data-music={music}
	data-seconds={seconds}
	data-manual={manual ? '' : undefined}
	class="scene-circles relative z-10 flex min-h-svh w-full shrink-0 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center horiz:h-svh horiz:min-h-0 horiz:px-16 horiz:py-16 {narrow
		? 'horiz:w-[70vw]'
		: 'horiz:w-screen'} {className}"
>
	{#if ghost}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-[min(70vw,60svh)] leading-none font-bold text-white/30 select-none"
		>
			{ghost}
		</span>
	{/if}

	{@render bg?.()}

	<div class="relative z-10 flex w-full max-w-6xl flex-col items-center gap-6 horiz:gap-[3svh]">
		{@render children()}
	</div>
</section>
