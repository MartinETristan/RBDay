import { tracks } from './tracks.ts';

/** Estado de la música de fondo. */
export const music = $state({ started: false, muted: false, index: 0, failed: false });

const VOLUME = 0.6;
let audio: HTMLAudioElement | null = null;
let errorsInARow = 0;
let fade = 0;

function load(index: number) {
	if (!audio) return;
	music.index = index;
	audio.src = tracks[index].src;
	audio.play().catch(() => {});
}

function next() {
	load((music.index + 1) % tracks.length);
}

function fadeIn() {
	if (!audio) return;
	clearInterval(fade);
	audio.volume = 0;
	fade = window.setInterval(() => {
		if (!audio) return clearInterval(fade);
		audio.volume = Math.min(VOLUME, audio.volume + 0.04);
		if (audio.volume >= VOLUME) clearInterval(fade);
	}, 120);
}

/** Inicia (o continúa) la música. Debe llamarse desde un clic del usuario. */
export function startMusic() {
	if (!audio) {
		audio = new Audio();
		audio.addEventListener('ended', () => {
			errorsInARow = 0;
			next();
		});
		audio.addEventListener('playing', () => (errorsInARow = 0));
		// Archivo faltante: salta a la siguiente; si fallan todas, queda en silencio.
		audio.addEventListener('error', () => {
			errorsInARow++;
			if (errorsInARow >= tracks.length) {
				music.failed = true;
				return;
			}
			next();
		});
		audio.muted = music.muted;
		load(0);
		fadeIn();
	} else if (audio.paused && !music.failed) {
		audio.play().catch(() => {});
	}
	music.started = true;
}

export function toggleMute() {
	music.muted = !music.muted;
	if (audio) audio.muted = music.muted;
}
