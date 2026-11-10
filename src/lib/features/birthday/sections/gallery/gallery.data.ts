/**
 * Galería. Pon tus fotos en `static/photos/` y escribe la ruta en `src`,
 * por ejemplo: src: '/photos/rosario-1.jpg'. Con `src: null` se ve un marcador.
 */
export const photos: { src: string | null; alt: string; label: string }[] = [
	{ src: null, alt: 'Rosario', label: 'Foto 1 · Rosario' },
	{ src: '/photos/nosotros1.jpeg', alt: 'Nosotros', label: 'Foto 2 · Nosotros' },
	{ src: null, alt: 'Rosario', label: 'Foto 3 · Rosario' },
	{ src: null, alt: 'Nosotros', label: 'Foto 4 · Nosotros' },
	{ src: null, alt: 'Un recuerdo', label: 'Foto 5 · Recuerdo' },
	{ src: null, alt: 'Nosotros', label: 'Foto 6 · Nosotros' }
];
