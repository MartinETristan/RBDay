import type { Action } from 'svelte/action';
import { afterIntro } from './afterIntro.ts';

/** Cuenta de 0 al número cada vez que entra en pantalla (como las cifras de un Wrapped). */
export const countUp: Action<HTMLElement, { to: number; duration?: number }> = (node, params) => {
	let to = params.to;
	let visible = false;
	let frame = 0;
	let cancelWait = () => {};

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const show = (v: number) => (node.textContent = String(Math.round(v)));

	show(reduced ? to : 0);

	const run = () => {
		cancelAnimationFrame(frame);
		const duration = params.duration ?? 1600;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			show(to * (1 - Math.pow(1 - t, 3)));
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	};

	const io = new IntersectionObserver(
		(entries) => {
			visible = entries.some((e) => e.isIntersecting);
			if (reduced) return;
			cancelWait();
			if (visible) cancelWait = afterIntro(node, run);
			else {
				cancelAnimationFrame(frame);
				show(0);
			}
		},
		{ threshold: 0.4 }
	);
	io.observe(node);

	return {
		update(next) {
			to = next.to;
			if (reduced || !visible) show(reduced ? to : 0);
		},
		destroy() {
			io.disconnect();
			cancelWait();
			cancelAnimationFrame(frame);
		}
	};
};
