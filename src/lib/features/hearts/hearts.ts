/** Corazones que suben, deterministas (sin Math.random) para SSR e hidratación. */

export const hearts = Array.from({ length: 9 }, (_, i) => {
	const size = 22 + ((i * 11) % 30);
	return {
		style:
			`left:${(i * 41 + 6) % 92}%;top:100%;width:${size}px;height:${Math.round(size * 0.92)}px;` +
			`opacity:.9;animation-duration:${14 + (i % 5) * 3}s;` +
			`animation-delay:-${((i * 3.3) % 14).toFixed(1)}s`
	};
});
