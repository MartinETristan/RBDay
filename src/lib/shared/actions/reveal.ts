import type { Action } from 'svelte/action';
import { observeInView } from './inView.ts';

/**
 * Hace aparecer el elemento (fade + subida) cada vez que entra en pantalla,
 * y lo oculta al salir, para que la animación se repita al volver a la escena. `delay` en ms.
 */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
	node.classList.add('reveal');
	node.style.setProperty('--delay', `${delay}ms`);

	const stop = observeInView(node, (v) => node.classList.toggle('in', v), {
		threshold: 0.15,
		rootMargin: '0px -4% 0px -4%'
	});

	return { destroy: stop };
};
