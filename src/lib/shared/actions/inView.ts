/**
 * Observa si `node` está en pantalla (≥ `threshold` de su área), usando su posición NATURAL:
 * se descuenta el `transform` actual del nodo y de sus ancestros.
 *
 * Por qué: IntersectionObserver mide la caja ya transformada. Si la animación de entrada mueve el
 * propio elemento (p. ej. `translateY(36px)` al ocultarse), en el borde de la pantalla se forma un
 * bucle: sale → se oculta y baja → vuelve a "entrar" → sube → sale… y el elemento da saltos.
 */
export function observeInView(
	node: HTMLElement,
	onChange: (inView: boolean) => void,
	{ threshold = 0.15, rootMargin = '0px' }: { threshold?: number; rootMargin?: string } = {}
): () => void {
	let current: boolean | null = null;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				let dx = 0;
				let dy = 0;
				for (let el: Element | null = node; el && el !== document.body; el = el.parentElement) {
					const t = getComputedStyle(el).transform;
					if (t && t !== 'none') {
						const m = new DOMMatrixReadOnly(t);
						dx += m.m41;
						dy += m.m42;
					}
				}
				const r = entry.boundingClientRect;
				const root = entry.rootBounds ?? new DOMRect(0, 0, innerWidth, innerHeight);
				const left = r.left - dx;
				const top = r.top - dy;
				const w = Math.max(0, Math.min(left + r.width, root.right) - Math.max(left, root.left));
				const h = Math.max(0, Math.min(top + r.height, root.bottom) - Math.max(top, root.top));
				const area = r.width * r.height;
				const visible = area > 0 && (w * h) / area >= threshold;
				if (visible !== current) {
					current = visible;
					onChange(visible);
				}
			}
		},
		// Umbrales finos: el callback se dispara a menudo mientras el elemento cruza el borde.
		{ threshold: Array.from({ length: 21 }, (_, i) => i / 20), rootMargin }
	);
	io.observe(node);
	return () => io.disconnect();
}
