import type { Action } from 'svelte/action';
import { observeInView } from './inView.ts';

/**
 * Entrada de texto palabra por palabra: cada palabra aparece (fade + subida) con un pequeño
 * escalonado, cada vez que el elemento entra en pantalla. `delay` = espera inicial en ms.
 */
export const words: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
	const text = node.textContent?.trim().split(/\s+/) ?? [];
	node.textContent = '';
	text.forEach((w, i) => {
		const span = document.createElement('span');
		span.className = 'word';
		span.textContent = w;
		span.style.setProperty('--i', String(i));
		node.append(span, i < text.length - 1 ? ' ' : '');
	});
	node.classList.add('words');
	node.style.setProperty('--delay', `${delay}ms`);

	const stop = observeInView(node, (v) => node.classList.toggle('in', v));

	return { destroy: stop };
};
