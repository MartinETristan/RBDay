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
		narrow = false,
		class: className = '',
		bg,
		children
	}: {
		id: string;
		title: string;
		ghost?: string;
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
