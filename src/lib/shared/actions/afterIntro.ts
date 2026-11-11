/** Evento que emite la escena (`<section data-scene>`) cuando su título de entrada libera el contenido. */
export const INTRO_RELEASE = 'introrelease';

/**
 * Ejecuta `fn` cuando el contenido de la escena ya se ve: de inmediato, o si la escena aún
 * muestra su título de entrada (ver Scene.svelte → `intro`), al liberarse el contenido.
 * Devuelve una función para cancelar la espera.
 */
export function afterIntro(node: HTMLElement, fn: () => void): () => void {
	const scene = node.closest<HTMLElement>('[data-scene]');
	if (scene?.dataset.intro !== 'hold') {
		fn();
		return () => {};
	}
	scene.addEventListener(INTRO_RELEASE, fn, { once: true });
	return () => scene.removeEventListener(INTRO_RELEASE, fn);
}
