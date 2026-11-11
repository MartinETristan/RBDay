/** Segundos que dura cada escena en el modo historia (como en Spotify Wrapped). */
export const SCENE_SECONDS = 12;

/** Segundos quieto en una escena (tras moverse a mano) antes de reanudar el avance automático. */
export const MANUAL_IDLE_SECONDS = 15;

/** Modo historia: avanza solo de escena en escena. Se activa con el botón "Iniciar". */
export const player = $state({ playing: false });

/** Si es true, el próximo cambio de escena cuenta como automático (p. ej. el clic en "Iniciar"). */
export const autoMove = { next: false };
