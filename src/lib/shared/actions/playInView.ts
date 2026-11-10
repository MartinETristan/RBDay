/** Reproduce el video solo mientras está en pantalla (ahorra batería y datos). */
export function playInView(video: HTMLVideoElement) {
	const io = new IntersectionObserver(
		([e]) => {
			if (e.isIntersecting) video.play().catch(() => {});
			else video.pause();
		},
		{ threshold: 0.4 }
	);
	io.observe(video);
	return { destroy: () => io.disconnect() };
}
