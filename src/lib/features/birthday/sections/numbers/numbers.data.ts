/**
 * Datos de las escenas de estadísticas.
 *
 * Citas: "cada domingo casi desde que inició la relación". Se cuentan los domingos desde
 * el primero después del 12 de octubre de 2025 (el domingo 19 de octubre). Cambia la fecha si fue otra.
 */
export const DATES_START = new Date(2025, 9, 19).getTime();

/** Viajes que han hecho juntos. */
export const trips = ['Monterrey, N.L.', 'Reynosa'];

/** Mensajes: no se cuentan, se dice como es. */
export const messages = {
	big: 'Todos los días',
	detail: 'nos escribimos por Instagram'
};
