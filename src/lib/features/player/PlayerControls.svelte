<script lang="ts">
	import { music, toggleMute } from './music.svelte.ts';
	import { player } from './player.svelte.ts';

	// Solo aparecen después de pulsar "Iniciar".
	let visible = $derived(music.started);

	const btn =
		'flex size-12 cursor-pointer items-center justify-center rounded-full bg-cream text-rose-400 shadow-[0_4px_0_var(--color-rose)] transition hover:-translate-y-0.5';
</script>

{#if visible}
	<div class="fixed bottom-6 left-4 z-50 flex gap-2 horiz:left-6">
		<button
			type="button"
			class={btn}
			aria-pressed={player.playing}
			aria-label={player.playing ? 'Pausar el avance automático' : 'Reanudar el avance automático'}
			title={player.playing ? 'Pausar' : 'Reanudar'}
			onclick={() => (player.playing = !player.playing)}
		>
			{#if player.playing}
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
					><rect x="6" y="5" width="4" height="14" rx="1" /><rect
						x="14"
						y="5"
						width="4"
						height="14"
						rx="1"
					/></svg
				>
			{:else}
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
					><path d="M8 5v14l11-7z" /></svg
				>
			{/if}
		</button>
		<button
			type="button"
			class={btn}
			aria-pressed={music.muted}
			aria-label={music.muted ? 'Activar la música' : 'Silenciar la música'}
			title={music.muted ? 'Activar música' : 'Silenciar'}
			onclick={toggleMute}
		>
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M11 5L6 9H3v6h3l5 4z" />
				{#if music.muted}
					<path d="M16 9l5 6M21 9l-5 6" />
				{:else}
					<path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
				{/if}
			</svg>
		</button>
	</div>
{/if}
