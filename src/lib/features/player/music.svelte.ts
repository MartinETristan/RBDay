import { tracks } from './tracks.ts';

/** Estado de la música de fondo. */
export const music = $state({ started: false, muted: false, index: 0, failed: false });

const VOLUME = 0.6;
const CROSSFADE_MS = 1500;
const STEP_MS = 100;

let current: HTMLAudioElement | null = null;
const fades = new Map<HTMLAudioElement, number>();
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
	const a = new Audio(tracks[index].src);
	a.loop = true;
	a.volume = 0;
	a.muted = music.muted;
	a.addEventListener('error', () => {
		if (current === a) music.failed = true;
	});
	a.play().catch(() => {});
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
