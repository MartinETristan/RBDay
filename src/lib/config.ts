/** Configuración global de la página. */

/** Medianoche (hora local del dispositivo) del 14 de noviembre de 2026. */
export const BIRTHDAY = new Date(2026, 10, 14, 0, 0, 0).getTime();

/**
 * Código para entrar a la página (pantalla de candado antes del contador y del cumpleaños).
 * Ojo: se revisa en el navegador, así que es un candado "de cortesía", no seguridad real.
 */
export const ACCESS_CODE = '131424';

/**
 * Recordar el código en este navegador.
 * En false se pide cada vez que se abre o se refresca la página.
 */
export const REMEMBER_CODE = false;

/**
 * Mostrar el contador antes del cumpleaños.
 * En false la página abre directo en la portada de cumpleaños (útil mientras se diseña).
 */
export const COUNTDOWN_ENABLED = true;
