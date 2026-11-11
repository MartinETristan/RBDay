/**
 * Canciones de la página. Pon los archivos de audio en `static/music/` con estos nombres
 * (o cambia `src`). `role: 'nuestra'` es la canción de ambos; el resto son las que cantan juntos.
 * Si un archivo no existe, se salta a la siguiente.
 */
export type Track = {
	title: string;
	artist: string;
	src: string;
	role: 'nuestra' | 'juntos' | 'escena';
	/** Identificador para asignarla a una escena concreta (`music` en <Scene>). */
	key?: string;
	/** Al llegar a su escena, empieza desde el principio (sin volver a descargarse). */
	restart?: boolean;
};

export const tracks: Track[] = [
	{
		title: 'Ophelia',
		artist: 'Taylor Swift',
		src: '/music/ophelia.mp3',
		role: 'nuestra',
		key: 'ophelia',
		restart: true
	},
	{
		title: "Don't Go Breaking My Heart",
		artist: 'Elton John & Kiki Dee',
		src: '/music/dont-go-breaking-my-heart.mp3',
		role: 'juntos'
	},
	{ title: 'Oiga', artist: 'Johan Sebastian', src: '/music/oiga.mp3', role: 'juntos' },
	{
		title: 'Hoy tengo ganas de ti',
		artist: 'Alejandro Fernández',
		src: '/music/hoy-tengo-ganas-de-ti.mp3',
		role: 'juntos'
	},
	// Canciones fijas de escenas concretas (no entran en la rotación).
	{ title: 'Fondo', artist: '', src: '/music/bg-fondo.mp3', role: 'escena', key: 'bienvenida' },
	{ title: 'Birthday', artist: '', src: '/music/birthday_slow.mp3', role: 'escena', key: 'carta' },
	{
		title: "Don't Go Breaking My Heart",
		artist: 'Elton John & Kiki Dee',
		src: '/music/dont-go-breaking-my-heart.mp3',
		role: 'escena',
		key: 'fin'
	}
];

/** Cuántas canciones rotan automáticamente (las primeras de la lista). */
export const ROTATION_COUNT = 4;

/** Canciones que hacen fade-in cada vez que empiezan de nuevo. */
export const FADE_IN_ON_LOOP = new Set(['bienvenida']);
