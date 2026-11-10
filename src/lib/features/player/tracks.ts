/**
 * Canciones de la página. Pon los archivos de audio en `static/music/` con estos nombres
 * (o cambia `src`). `role: 'nuestra'` es la canción de ambos; el resto son las que cantan juntos.
 * Si un archivo no existe, se salta a la siguiente.
 */
export type Track = {
	title: string;
	artist: string;
	src: string;
	role: 'nuestra' | 'juntos';
};

export const tracks: Track[] = [
	{ title: 'Ophelia', artist: 'Taylor Swift', src: '/music/ophelia.mp3', role: 'nuestra' },
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
	}
];
