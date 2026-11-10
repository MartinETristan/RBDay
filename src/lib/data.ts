/** Contenido editable de la página. */

/** Medianoche (hora local del dispositivo) del 14 de noviembre de 2026. */
export const BIRTHDAY = new Date(2026, 10, 14, 0, 0, 0).getTime();

/** Inicio de la relación (12 de octubre de 2025). */
export const RELATIONSHIP_START = new Date(2025, 9, 12).getTime();

export const timeline = [
	{ date: '31 de agosto de 2025', title: 'Nos conocimos', place: 'Fiesta de Oscar de Rotarac' },
	{ date: '6 de septiembre de 2025', title: 'Nuestra primera cita', place: '' },
	{ date: '16 de septiembre de 2025', title: 'Nuestro primer beso', place: '' },
	{ date: '12 de octubre de 2025', title: 'Empezó nuestra relación', place: 'Parque El Laguito' }
];

/**
 * Galería. Pon tus fotos en `static/photos/` y escribe la ruta en `src`,
 * por ejemplo: src: '/photos/rosario-1.jpg'. Con `src: null` se ve un marcador.
 */
export const photos: { src: string | null; alt: string; label: string }[] = [
	{ src: null, alt: 'Rosario', label: 'Foto 1 · Rosario' },
	{ src: null, alt: 'Nosotros', label: 'Foto 2 · Nosotros' },
	{ src: null, alt: 'Rosario', label: 'Foto 3 · Rosario' },
	{ src: null, alt: 'Nosotros', label: 'Foto 4 · Nosotros' },
	{ src: null, alt: 'Un recuerdo', label: 'Foto 5 · Recuerdo' },
	{ src: null, alt: 'Nosotros', label: 'Foto 6 · Nosotros' }
];

export const letter = {
	greeting: 'Para mi amorchito,',
	paragraphs: [
		'[Escribe aquí el inicio de tu carta: cómo te hace sentir Rosario y lo que significa para ti.]',
		'[Segundo párrafo: un recuerdo especial de ustedes y lo que deseas para sus 25 años.]',
		'[Cierre: tu promesa o tu deseo de cumpleaños para ella.]'
	],
	signoff: 'Con todo mi amor,',
	author: '[Tu nombre]'
};
