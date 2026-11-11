/**
 * Datos de las escenas de estadísticas.
 *
 * Citas: "cada domingo casi desde que inició la relación". Se cuentan los domingos desde
 * el primero después del 12 de octubre de 2025 (el domingo 19 de octubre). Cambia la fecha si fue otra.
 */
export const DATES_START = new Date(2025, 9, 19).getTime();

/** Viajes que han hecho juntos. `coords`: [longitud, latitud] para el mapa. */
export const trips: { name: string; coords: [number, number] }[] = [
	{ name: 'Monterrey, N.L.', coords: [-100.3161, 25.6866] },
	{ name: 'Reynosa', coords: [-98.2978, 26.0922] }
];

/** Fotos de fondo de la escena de viajes. */
export const tripPhotos = ['/photos/nosotros5.webp', '/photos/nosotros31.webp'];

/** Mensajes: no se cuentan, se dice como es. */
export const messages = {
	big: 'Todos los días',
	detail: 'desde que somos novios'
};
