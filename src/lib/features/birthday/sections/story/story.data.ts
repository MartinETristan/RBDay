/** Fechas importantes. `at` es la fecha real; `date` es el texto que se muestra. */
export const timeline = [
	{
		at: new Date(2025, 7, 31).getTime(),
		date: '31 de agosto de 2025',
		title: 'Nos conocimos',
		place: 'Fiesta de Oscar de Rotarac'
	},
	{
		at: new Date(2025, 8, 6).getTime(),
		date: '6 de septiembre de 2025',
		title: 'Nuestra primera cita',
		place: ''
	},
	{
		at: new Date(2025, 8, 16).getTime(),
		date: '16 de septiembre de 2025',
		title: 'Nuestro primer beso',
		place: ''
	},
	{
		at: new Date(2025, 9, 12).getTime(),
		date: '12 de octubre de 2025',
		title: 'Empezó nuestra relación',
		place: 'Parque El Laguito'
	}
];

/** Inicio de la relación (12 de octubre de 2025). */
export const RELATIONSHIP_START = timeline[timeline.length - 1].at;
