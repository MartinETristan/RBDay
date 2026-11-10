import Lenis from 'lenis';

/** Posición de scroll suavizada por Lenis (en X si el modo es horizontal), reactiva para parallax. */
export const scroll = $state({ y: 0, progress: 0, horizontal: false });

/**
 * Bloqueo de navegación: con `locked` no se puede cambiar de escena (rueda, teclado, tacto, barra).
 * Se usa en la portada hasta que se pulsa "Iniciar".
 */
export const nav = $state({ locked: false });

let lockedAt = { x: 0, y: 0 };

export function lockNavigation(locked: boolean) {
	nav.locked = locked;
	if (locked) lockedAt = { x: window.scrollX, y: window.scrollY };
	document.documentElement.classList.toggle('nav-locked', locked);
	if (locked) return;
	// Por si el navegador movió el scroll mientras estaba bloqueado: vuelve a la misma escena.
	if (window.scrollX !== lockedAt.x || window.scrollY !== lockedAt.y) {
		window.scrollTo({ left: lockedAt.x, top: lockedAt.y, behavior: 'instant' });
	}
	// Lenis pudo medir la página mientras estaba bloqueada: vuelve a medir al desbloquear.
	instance?.resize();
}

const DESKTOP = '(min-width: 1024px)';
const MOUSE = '(hover: hover) and (pointer: fine)';
const REDUCED = '(prefers-reduced-motion: reduce)';

/** Duración (s) de la transición entre escenas. */
const TRANSITION = 0.9;

let instance: Lenis | null = null;
let nativeAnim = 0;
let cancelNative = () => {};

const sceneList = () => [...document.querySelectorAll<HTMLElement>('[data-scene]')];

/** Índice de la escena que está al inicio de la pantalla (sirve en horizontal y en vertical). */
function currentIndex(): number {
	const horizontal = document.documentElement.classList.contains('horiz');
	let best = 0;
	let bestDist = Infinity;
	sceneList().forEach((el, i) => {
		const r = el.getBoundingClientRect();
		const d = Math.abs(horizontal ? r.left : r.top);
		if (d < bestDist) {
			bestDist = d;
			best = i;
		}
	});
	return best;
}

// Última escena en pantalla, actualizada cuando el scroll se detiene. Se usa al cambiar de modo
// (rotar, cambiar el tamaño de la ventana): para entonces el layout ya movió el scroll.
let lastIndex = 0;
let trackTimer = 0;
function trackScene() {
	clearTimeout(trackTimer);
	trackTimer = window.setTimeout(() => (lastIndex = currentIndex()), 150);
}

/**
 * Scroll nativo animado con requestAnimationFrame. Se apaga el snap de CSS mientras dura,
 * porque `scrollIntoView({ behavior: 'smooth' })` + scroll-snap falla en algunos navegadores
 * (se queda o vuelve a la primera escena). Al terminar, el snap se reactiva y deja la escena alineada.
 */
function nativeScrollTo(el: HTMLElement, immediate = false) {
	cancelNative();
	const root = document.documentElement;
	const horizontal = root.classList.contains('horiz');
	const rect = el.getBoundingClientRect();
	const fromX = window.scrollX;
	const fromY = window.scrollY;
	const toX = horizontal ? fromX + rect.left : 0;
	const toY = horizontal ? 0 : fromY + rect.top;

	root.classList.add('snap-off');
	const finish = () => {
		cancelAnimationFrame(nativeAnim);
		root.classList.remove('snap-off');
		for (const ev of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
			window.removeEventListener(ev, finish);
		}
		cancelNative = () => {};
	};
	cancelNative = finish;

	if (immediate) {
		window.scrollTo({ left: toX, top: toY, behavior: 'instant' });
		finish();
		return;
	}

	// Si la persona toca, gira la rueda o usa el teclado, ella toma el control.
	for (const ev of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
		window.addEventListener(ev, finish, { passive: true, once: true });
	}

	const start = performance.now();
	const duration = TRANSITION * 1000;
	const tick = (now: number) => {
		const t = Math.min(1, (now - start) / duration);
		const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		window.scrollTo({
			left: fromX + (toX - fromX) * e,
			top: fromY + (toY - fromY) * e,
			behavior: 'instant'
		});
		if (t < 1) nativeAnim = requestAnimationFrame(tick);
		else finish();
	};
	nativeAnim = requestAnimationFrame(tick);
}

/** Sube al inicio con scroll suave (Lenis) o directo si Lenis está desactivado. */
export function scrollToTop() {
	if (instance) instance.scrollTo(0, { duration: 1.6 });
	else {
		const first = sceneList()[0];
		if (first) nativeScrollTo(first);
	}
}

/** Lleva una escena al inicio de la pantalla (horizontal en escritorio, vertical en celular). */
export function scrollToElement(el: HTMLElement) {
	if (instance) instance.scrollTo(el, { duration: TRANSITION, lock: true });
	else nativeScrollTo(el);
}

/**
 * Siempre queda una escena completa en pantalla, nunca entre dos ("sticky"):
 * - Escritorio con mouse (>= 1024 px): scroll horizontal. Cada gesto de rueda o flecha del teclado
 *   avanza exactamente una escena, con Lenis animando la transición.
 * - Celular / táctil / ventana angosta: scroll nativo con CSS scroll-snap (clase `snap-native`),
 *   vertical en celular. En pantallas táctiles anchas, horizontal.
 * - Con "reducir movimiento" no hay modo horizontal ni Lenis.
 */
export function startLenis(): () => void {
	const desktop = window.matchMedia(DESKTOP);
	const reduced = window.matchMedia(REDUCED);
	const mouse = window.matchMedia(MOUSE);
	let stop = () => {};
	let ready = false;

	function setup() {
		// Al cambiar de modo (rotar, cambiar el tamaño de la ventana) se conserva la escena actual.
		const keep = ready ? lastIndex : -1;
		ready = true;
		stop();
		const horizontal = desktop.matches && !reduced.matches;
		document.documentElement.classList.toggle('horiz', horizontal);
		scroll.horizontal = horizontal;
		scroll.y = 0;

		// Tras aplicar el nuevo layout, vuelve a poner la misma escena (no la primera).
		const restore = () => {
			const el = keep > 0 ? sceneList()[keep] : null;
			if (!el) return;
			requestAnimationFrame(() => {
				if (instance) instance.scrollTo(el, { immediate: true, force: true });
				else nativeScrollTo(el, true);
			});
		};

		// Nativo: CSS scroll-snap (táctil, ventana angosta o reducir movimiento).
		if (!horizontal || !mouse.matches) {
			document.documentElement.classList.add('snap-native');
			const onScroll = () => {
				scroll.y = horizontal ? window.scrollX : window.scrollY;
				trackScene();
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			stop = () => {
				cancelNative();
				window.removeEventListener('scroll', onScroll);
			};
			restore();
			return;
		}
		document.documentElement.classList.remove('snap-native');

		// Horizontal con mouse: Lenis solo anima; la rueda y el teclado los manejamos aquí.
		const lenis = new Lenis({
			orientation: 'horizontal',
			gestureOrientation: 'both',
			smoothWheel: false
		});
		instance = lenis;

		lenis.on('scroll', (e: Lenis) => {
			scroll.y = e.scroll;
			scroll.progress = e.progress;
			trackScene();
		});

		let frame = requestAnimationFrame(function raf(time) {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		});

		const scenes = sceneList;

		// --- Rueda / trackpad ---------------------------------------------------------------
		// Un deslizamiento del trackpad produce decenas de eventos: primero crecen, luego decaen
		// (inercia). Reglas: (1) los eventos suaves se acumulan hasta un umbral; (2) tras cambiar de
		// escena se ignora la inercia del mismo gesto, pero un empujón NUEVO (los deltas vuelven a
		// crecer, o hubo una pausa) cambia de escena otra vez sin esperar a que termine la inercia.
		const THRESHOLD = 40;
		let busyUntil = 0; // la animación de cambio de escena está corriendo
		let inertia = false; // seguimos en la cola de inercia del gesto anterior
		let acc = 0;
		let lastWheel = 0;
		let prevAbs = 0;

		function step(dir: 1 | -1) {
			const list = scenes();
			if (!list.length) return;
			const current = Math.round(window.scrollX / window.innerWidth);
			const target = Math.max(0, Math.min(list.length - 1, current + dir));
			if (target === current) return;
			busyUntil = performance.now() + TRANSITION * 1000;
			inertia = true;
			acc = 0;
			lenis.scrollTo(list[target], { duration: TRANSITION, lock: true });
		}

		function onWheel(e: WheelEvent) {
			// La rueda la maneja este código; Lenis no debe verla (si no, queda atascado en
			// "scrolling" y deja de animar, sobre todo mientras la navegación está bloqueada).
			e.stopImmediatePropagation();
			e.preventDefault();
			if (nav.locked) return;

			const now = performance.now();
			let delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
			if (e.deltaMode === 1)
				delta *= 16; // líneas -> px (Firefox)
			else if (e.deltaMode === 2) delta *= window.innerWidth; // páginas
			const abs = Math.abs(delta);
			const gap = now - lastWheel;
			lastWheel = now;
			const before = prevAbs;
			prevAbs = abs;

			// Mientras corre la animación todo se ignora.
			if (now < busyUntil) return;

			// Cola de inercia: se ignora mientras los deltas sigan decayendo sin pausas.
			if (inertia) {
				const newPush = gap > 90 || abs > before * 1.35 + 4;
				if (!newPush) return;
				inertia = false;
				acc = 0;
			}

			if (gap > 160) acc = 0; // gesto nuevo
			if (acc !== 0 && Math.sign(delta) !== Math.sign(acc)) acc = 0;
			acc += delta;
			if (Math.abs(acc) < THRESHOLD) return;
			step(acc > 0 ? 1 : -1);
		}

		function onKey(e: KeyboardEvent) {
			const next = ['ArrowRight', 'ArrowDown', 'PageDown'];
			const prev = ['ArrowLeft', 'ArrowUp', 'PageUp'];
			if (!next.includes(e.key) && !prev.includes(e.key)) return;
			if (nav.locked) return e.preventDefault();
			if (next.includes(e.key)) step(1);
			else step(-1);
			e.preventDefault();
		}

		// Si el tamaño de la ventana cambia, vuelve a alinear la escena actual.
		function onResize() {
			const list = scenes();
			const i = Math.round(lenis.scroll / window.innerWidth);
			if (list[i]) lenis.scrollTo(list[i], { immediate: true });
		}

		restore();
		window.addEventListener('wheel', onWheel, { passive: false, capture: true });
		window.addEventListener('keydown', onKey);
		window.addEventListener('resize', onResize);

		stop = () => {
			window.removeEventListener('wheel', onWheel, { capture: true });
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(frame);
			lenis.destroy();
			instance = null;
		};
	}

	setup();
	desktop.addEventListener('change', setup);
	reduced.addEventListener('change', setup);
	mouse.addEventListener('change', setup);

	return () => {
		desktop.removeEventListener('change', setup);
		reduced.removeEventListener('change', setup);
		mouse.removeEventListener('change', setup);
		stop();
	};
}
