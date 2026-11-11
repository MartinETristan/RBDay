<script lang="ts">
	import { onMount } from 'svelte';
	import { lockNavigation } from '#lib/shared/scroll/lenis.svelte.ts';
	import PlayerControls from '#lib/features/player/PlayerControls.svelte';
	import StoryProgress from '#lib/features/player/StoryProgress.svelte';
	import Welcome from './sections/welcome/Welcome.svelte';
	import Footer from './sections/footer/Footer.svelte';
	import Gallery from './sections/gallery/Gallery.svelte';
	import Hero from './sections/hero/Hero.svelte';
	import Letter from './sections/letter/Letter.svelte';
	import Numbers from './sections/numbers/Numbers.svelte';
	import Song from './sections/song/Song.svelte';
	import Story from './sections/story/Story.svelte';

	/** `now`: hora actual en ms, para los contadores. */
	let { now }: { now: number } = $props();

	// La navegación queda bloqueada en la portada hasta pulsar "Iniciar".
	onMount(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		lockNavigation(true);
		return () => lockNavigation(false);
	});
</script>

<StoryProgress />
<PlayerControls />

<!-- Estilo Wrapped: cada sección es una escena. Escritorio: en fila (scroll horizontal). Celular: en columna. -->
<main class="relative horiz:flex horiz:w-max horiz:flex-row">
	<Hero />
	<Welcome />
	<Story {now} />
	<Numbers {now} />
	<Gallery />
	<Song />
	<Letter />
	<Footer />
</main>
