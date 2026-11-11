// Test sin dependencias nuevas: `node --test tests/`.
// Compila music.svelte.ts con el compilador de Svelte (ya instalado) y lo ejecuta contra un
// <audio> falso que imita la política de WebKit/iOS: un elemento solo puede sonar si recibió
// play() o load() DENTRO de un gesto del usuario; el permiso es por elemento, no por página.
import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { stripTypeScriptTypes } from 'node:module';
import { compileModule } from 'svelte/compiler';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const playerDir = path.join(root, 'src/lib/features/player');
// Dentro de node_modules para que `svelte/internal/client` se resuelva.
const outDir = path.join(root, 'node_modules/.cache/rbday-test');

let gesture = false;
const created = [];

class FakeAudio {
	constructor(src = '') {
		Object.assign(this, { src, paused: true, volume: 1, muted: false, loop: false });
		Object.assign(this, { preload: 'auto', currentTime: 0, allowed: false });
		created.push(this);
	}
	addEventListener() {}
	load() {
		if (gesture) this.allowed = true;
	}
	play() {
		if (gesture) this.allowed = true;
		if (!this.allowed) return Promise.reject(new DOMException('', 'NotAllowedError'));
		this.paused = false;
		return Promise.resolve();
	}
	pause() {
		this.paused = true;
	}
}
globalThis.Audio = FakeAudio;
globalThis.window = globalThis;

let n = 0;
/** Instancia nueva del módulo en cada test (su estado es global). */
async function loadMusic() {
	created.length = 0;
	let code = stripTypeScriptTypes(fs.readFileSync(path.join(playerDir, 'music.svelte.ts'), 'utf8'));
	code = compileModule(code, { filename: 'music.svelte.js', generate: 'client' }).js.code;
	code = code.replace(
		"'./tracks.ts'",
		`'${pathToFileURL(path.join(playerDir, 'tracks.ts')).href}'`
	);
	fs.mkdirSync(outDir, { recursive: true });
	const file = path.join(outDir, `music-${++n}.js`);
	fs.writeFileSync(file, code);
	return import(pathToFileURL(file).href);
}

const inGesture = (fn) => {
	gesture = true;
	try {
		fn();
	} finally {
		gesture = false;
	}
};
const bySrc = (end) => created.find((a) => a.src.endsWith(end));

test('un cambio de escena fuera de un gesto sigue sonando (Safari/iOS)', async () => {
	mock.timers.enable({ apis: ['setInterval'] });
	try {
		const m = await loadMusic();
		// Clic en «Iniciar».
		inGesture(() => {
			m.musicForKey('bienvenida');
			m.startMusic();
		});
		assert.equal(bySrc('bg-fondo.mp3').paused, false);
		// El temporizador / el scroll cambian de escena: no hay gesto.
		m.musicForKey('galeria');
		const galeria = bySrc('bg-galeria.mp3');
		assert.ok(galeria, 'se creó el reproductor de la galería');
		assert.equal(galeria.paused, false, 'la galería debe sonar sin un gesto nuevo');
	} finally {
		mock.timers.reset();
	}
});

test('el contador espera a un gesto válido y no se desarma si falla', async () => {
	const m = await loadMusic();
	const target = new EventTarget();
	let calls = 0;
	m.startOnGesture(() => {
		calls++;
		m.musicForKey('bienvenida');
		m.startMusic();
	}, target);
	const fire = (type, isGesture) => {
		gesture = isGesture;
		try {
			target.dispatchEvent(new Event(type));
		} finally {
			gesture = false;
		}
	};
	// touchstart / pointerdown táctil no son gesto para el navegador: no deben gastar el intento.
	fire('touchstart', false);
	fire('pointerdown', false);
	assert.equal(calls, 0);
	// touchend al terminar un scroll: tampoco es gesto → no suena, pero sigue a la escucha.
	fire('touchend', false);
	assert.equal(bySrc('bg-fondo.mp3').paused, true);
	// Un toque real.
	fire('touchend', true);
	assert.equal(bySrc('bg-fondo.mp3').paused, false);
	// Ya sonó: se desarma.
	const before = calls;
	fire('click', true);
	assert.equal(calls, before);
});
