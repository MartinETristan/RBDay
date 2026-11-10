import { tracks } from './tracks.ts';

/** Estado de la música de fondo. */
export const music = $state({ started: false, muted: false, index: 0, failed: false });

const VOLUME = 0.6;
const CROSSFADE_MS = 1500;
const STEP_MS = 100;

let current: HTMLAudioElement | null = null;
// Mapa interno de intervalos de fade; no es estado reactivo.
// eslint-disable-next-line svelte/prefer-svelte-reactivity
const fades = new Map<HTMLAudioElement, number>();
/** Un reproductor por canción: al volver a una canción se reutiliza (no se descarga otra vez). */
const players: HTMLAudioElement[] = [];

function audioFor(index: number) {
	let a = players[index];
	if (!a) {
		const created = new Audio(tracks[index].src);
		created.preload = 'none'; // se descarga solo al reproducirla
		created.loop = true;
		created.volume = 0;
		created.addEventListener('error', () => {
			if (current === created) music.failed = true;
		});
		players[index] = a = created;
	}
	return a;
}
let wanted = 0;

function ramp(a: HTMLAudioElement, to: number, then?: () => void) {
	clearInterval(fades.get(a));
	const step = (VOLUME * STEP_MS) / CROSSFADE_MS;
	const id = window.setInterval(() => {
		const v = a.volume;
		const nv = v < to ? Math.min(to, v + step) : Math.max(to, v - step);
		a.volume = nv;
		if (nv === to) {
			clearInterval(id);
			fades.delete(a);
			then?.();
		}
	}, STEP_MS);
	fades.set(a, id);
}

function crossfadeTo(index: number) {
	if (current && music.index === index) {
		if (current.paused && !music.failed) current.play().catch(() => {});
		return;
	}
	const old = current;
	const a = audioFor(index);
	a.muted = music.muted;
	// Si aún se estaba desvaneciendo, `ramp` cancela ese fade y sube desde el volumen actual.
	if (a.paused) a.play().catch(() => {});
	current = a;
	music.index = index;
	music.failed = false;
	ramp(a, VOLUME);
	if (old) ramp(old, 0, () => old.pause());
}

/** Inicia la música. Debe llamarse desde un clic del usuario. */
export function startMusic() {
	if (!music.started) {
		music.started = true;
		crossfadeTo(wanted);
	} else if (current?.paused && !music.failed) {
		current.play().catch(() => {});
	}
}

/** Cambia de canción (con crossfade) según la escena activa. */
export function musicForTrack(i: number) {
	wanted = i % tracks.length;
	if (music.started) crossfadeTo(wanted);
}

export function toggleMute() {
	music.muted = !music.muted;
	for (const a of [current, ...fades.keys()]) if (a) a.muted = music.muted;
}
