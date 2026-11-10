/** Destellos deterministas (sin Math.random) para que SSR e hidratación coincidan. */

const glitterColors = ['#FFFFFF', '#FFE08A', '#FFF6FA', '#FFD3E4', '#FFD76A'];

export const sparkles = Array.from({ length: 46 }, (_, i) => {
	const dot = i % 3 === 0;
	const size = dot ? 4 + (i % 3) * 2 : 9 + ((i * 5) % 15);
	// Profundidad para el parallax: los más grandes están "más cerca" y se mueven más rápido
	// (0.25 = lejos, casi quieto; ~1.25 = cerca, más rápido que la página).
	const depth = dot ? 0.25 + (i % 4) * 0.08 : 0.4 + ((size - 9) / 14) * 0.85;
	return {
		dot,
		/** Posición base (vw / svh) y profundidad: las usa el CSS del parallax. */
		place: `--x0:${(i * 37 + 11) % 100};--y0:${(i * 53 + 7) % 100};--d:${depth.toFixed(2)}`,
		style:
			`width:${size}px;height:${size}px;background:${glitterColors[i % glitterColors.length]};` +
			`animation-delay:-${((i * 0.7) % 3).toFixed(1)}s;` +
			`animation-duration:${(2 + (i % 4) * 0.8).toFixed(1)}s;` +
			`filter:drop-shadow(0 0 3px rgba(255,255,255,.9))`
	};
});
