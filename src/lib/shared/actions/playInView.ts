/**
 * Video perezoso: no descarga nada hasta que está cerca de la pantalla (preload="none" → "metadata")
 * y solo se reproduce mientras está a la vista (ahorra batería y datos).
 */
export function playInView(video: HTMLVideoElement) {
	const near = new IntersectionObserver(
		([e]) => {
			if (!e.isIntersecting) return;
			video.preload = 'metadata';
			near.disconnect();
		},
		{ rootMargin: '100%' }
	);
	const io = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting) video.play().catch(() => {});
			else video.pause();
		},
		{ threshold: 0.4 }
	);
	near.observe(video);
	io.observe(video);
	return {
		destroy: () => {
			near.disconnect();
			io.disconnect();
		}
	};
}
