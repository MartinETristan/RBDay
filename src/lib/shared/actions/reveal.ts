import type { Action } from 'svelte/action';

/**
 * Hace aparecer el elemento (fade + subida) cada vez que entra en pantalla,
 * y lo oculta al salir, para que la animación se repita al volver a la escena. `delay` en ms.
 */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
	node.classList.add('reveal');
	node.style.setProperty('--delay', `${delay}ms`);

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) node.classList.toggle('in', entry.isIntersecting);
		},
		{ threshold: 0.15, rootMargin: '0px -4% 0px -4%' }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
};
