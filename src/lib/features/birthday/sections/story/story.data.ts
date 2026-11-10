/** Fechas importantes. `coords`: [longitud, latitud] del lugar; con `null` no se muestra mapa.
 * `at` es la fecha real; `date` es el texto que se muestra. */
export const timeline = [
	{
		at: new Date(2025, 7, 31).getTime(),
		date: '31 de agosto de 2025',
		title: 'Nos conocimos',
		place: 'Fiesta de Oscar',
		coords: [-97.5030878, 25.8584979] as [number, number] | null,
		photos: ['/photos/31_agosto.webp', '/photos/31_agosto2.webp'] as string[]
	},
	{
		at: new Date(2025, 8, 6).getTime(),
		date: '6 de septiembre de 2025',
		title: 'Nuestra primera cita',
		place: 'MERT',
		coords: [-97.5031372, 25.8806972] as [number, number] | null,
		photos: ['/photos/6_septiembre.webp']
	},
	{
		at: new Date(2025, 8, 16).getTime(),
		date: '16 de septiembre de 2025',
		title: 'Nuestro primer beso',
		place: 'Cita en el Parque Lineal',
		coords: [-97.4712235, 25.8537587] as [number, number] | null,
		photos: [] as string[]
	},
	{
		at: new Date(2025, 9, 12).getTime(),
		date: '12 de octubre de 2025',
		title: 'Empezó nuestra relación',
		place: 'Parque El Laguito',
		coords: [-97.4956668, 25.8688153] as [number, number] | null,
		photos: ['/photos/12_octubre.webp']
	}
];

/** Inicio de la relación (12 de octubre de 2025). */
export const RELATIONSHIP_START = timeline[timeline.length - 1].at;
