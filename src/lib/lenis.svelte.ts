import Lenis from 'lenis';

/** Posición de scroll suavizada por Lenis, reactiva para animaciones (parallax, etc.). */
export const scroll = $state({ y: 0, progress: 0 });

/** Inicia Lenis con su propio bucle rAF. Devuelve la función para destruirlo. */
export function startLenis(): () => void {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

	const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });

	lenis.on('scroll', (e: Lenis) => {
		scroll.y = e.scroll;
		scroll.progress = e.progress;
	});

	let frame = requestAnimationFrame(function raf(time) {
		lenis.raf(time);
		frame = requestAnimationFrame(raf);
	});

	return () => {
		cancelAnimationFrame(frame);
		lenis.destroy();
	};
}
