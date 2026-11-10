import { createConfetti } from './confetti.ts';

/** Duración de la emisión (ms). Después deja de salir hasta el próximo lanzamiento. */
const DURATION = 2000;
/** Cada cuánto sale una tanda (ms). */
const INTERVAL = 200;
/** Piezas por tanda. */
const PIECES = 24;
/** Cuánto tarda una tanda en caer del todo antes de retirarla (ms). */
const LIFETIME = 8000;

type Batch = { id: number; pieces: string[] };

/** Tandas activas. Cada lanzamiento suma tandas nuevas sin cortar las anteriores. */
export const confetti = $state<{ batches: Batch[] }>({ batches: [] });

let nextId = 0;

function addBatch() {
	const id = nextId++;
	confetti.batches.push({ id, pieces: createConfetti(PIECES) });
	setTimeout(() => {
		confetti.batches = confetti.batches.filter((b) => b.id !== id);
	}, LIFETIME);
}

/** Emite confeti de forma continua por 2 segundos y luego se detiene. */
export function launchConfetti() {
	const start = performance.now();
	addBatch();
	const timer = setInterval(() => {
		if (performance.now() - start >= DURATION) return clearInterval(timer);
		addBatch();
	}, INTERVAL);
}
