import { FADE_IN_ON_LOOP, tracks } from './tracks.ts';

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
/** Volumen propio: Safari/iOS ignora `audio.volume` (siempre lee 1), así que el fade no puede depender de él. */
const vols = new WeakMap<HTMLAudioElement, number>();
function setVol(a: HTMLAudioElement, v: number) {
	vols.set(a, v);
	a.volume = v;
}

function audioFor(index: number) {
	let a = players[index];
	if (!a) {
		const created = new Audio(tracks[index].src);
		created.preload = 'none'; // se descarga solo al reproducirla
		const fadeLoop = FADE_IN_ON_LOOP.has(tracks[index].key ?? '');
		created.loop = !fadeLoop;
		setVol(created, 0);
		if (fadeLoop) {
			// Al terminar, vuelve a empezar desde silencio con un fade-in.
			created.addEventListener('ended', () => {
				if (current !== created) return;
				setVol(created, 0);
				created.currentTime = 0;
				created.play().catch(() => {});
				ramp(created, VOLUME);
			});
		}
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
		const v = vols.get(a) ?? 0;
		const nv = v < to ? Math.min(to, v + step) : Math.max(to, v - step);
		setVol(a, nv);
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
	// Seguridad: ninguna otra canción puede seguir sonando (Safari).
	for (const p of players) if (p && p !== a && p !== old && !p.paused) p.pause();
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

/** Desvanece y pausa la música actual (escenas sin música). */
function silence() {
	if (!current) return;
	const old = current;
	current = null;
	ramp(old, 0, () => old.pause());
}

/** Cambia a la canción fija de una escena (por su `key`). */
export function musicForKey(key: string) {
	if (key === 'silencio') return silence();
	const i = tracks.findIndex((t) => t.key === key);
	if (i < 0) return;
	musicForTrack(i);
	// Reinicia la canción reutilizando el mismo reproductor (no se pide de nuevo).
	if (tracks[i].restart && music.started && current === players[i]) current.currentTime = 0;
}

export function toggleMute() {
	music.muted = !music.muted;
	for (const a of [current, ...fades.keys()]) if (a) a.muted = music.muted;
}
