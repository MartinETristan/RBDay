import { createConfetti } from './confetti.ts';

/** Duración de la emisión (ms). Después deja de salir hasta el próximo lanzamiento. */
const DURATION = 2000;
/** Cada cuánto sale una tanda (ms). */
const INTERVAL = 250;
/** Piezas por tanda. */
const PIECES = 14;
/** Cuánto tarda una tanda en caer del todo antes de retirarla (ms): retraso máx. 0.7 s + animación máx. 4.8 s. */
const LIFETIME = 5800;
/** Duración del fade-out de las tandas retiradas por el tope (ms). Debe coincidir con el CSS. */
const FADE = 400;
/** Tope de piezas en pantalla: al pedir más confeti se retiran las tandas más viejas. */
const MAX_PIECES = 120;

type Batch = { id: number; pieces: string[]; leaving: boolean };

/** Tandas activas. Cada lanzamiento suma tandas nuevas sin cortar las anteriores. */
export const confetti = $state<{ batches: Batch[] }>({ batches: [] });

let nextId = 0;

function addBatch() {
	const id = nextId++;
	confetti.batches.push({ id, pieces: createConfetti(PIECES), leaving: false });
	// Si se pasa del tope, las tandas más viejas se desvanecen (en vez de cortarse de golpe).
	const alive = confetti.batches.filter((b) => !b.leaving);
	for (const old of alive.slice(0, Math.max(0, alive.length - MAX_PIECES / PIECES))) {
		old.leaving = true;
		setTimeout(() => remove(old.id), FADE);
	}
	setTimeout(() => remove(id), LIFETIME);
}

function remove(id: number) {
	confetti.batches = confetti.batches.filter((b) => b.id !== id);
}

let timer: ReturnType<typeof setInterval> | undefined;

/** Emite confeti de forma continua por 2 segundos y luego se detiene. */
export function launchConfetti() {
	const start = performance.now();
	clearInterval(timer); // un solo emisor: pulsar varias veces no apila temporizadores
	addBatch();
	timer = setInterval(() => {
		if (performance.now() - start >= DURATION) return clearInterval(timer);
		addBatch();
	}, INTERVAL);
}
