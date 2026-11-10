/**
 * Galería: cada página es una escena (6 elementos; "ella" tiene 4). Fotos en `static/photos/`,
 * videos en `static/videos/`.
 *
 * Para personalizar un elemento, llena su `date` (se ve en la tarjeta y en primer plano) y su
 * `text` (solo en primer plano). Con `` (vacío) no se muestra nada.
 * Escríbelos entre comillas invertidas (`...`): así puedes usar ' y " y hasta saltos de línea. El orden de aquí es el de la página.
 */
export type GalleryItem = {
	type: 'photo' | 'video';
	src: string;
	alt: string;
	date: string;
	text: string;
};
export type GalleryPage = { kind: 'nosotros' | 'ella'; items: GalleryItem[] };

export const galleryPages: GalleryPage[] = [
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros1.webp',
				alt: 'Nosotros',
				date: `28/02/26`,
				text: `Nuestro primer evento como pareja en tu iglesia, estaba un poco nervioso pero todo salió muy bonito.`
			},
			{
				type: 'video',
				src: '/videos/laguito_us_2.webm',
				alt: 'Nosotros en el Laguito',
				date: ``,
				text: ``
			},
			{ type: 'photo', src: '/photos/nosotros2.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros3.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros4.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros5.webp', alt: 'Nosotros', date: ``, text: `` }
		]
	},
	{
		kind: 'nosotros',
		items: [
			{ type: 'photo', src: '/photos/nosotros6.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros7.webp', alt: 'Nosotros', date: ``, text: `` },
			{
				type: 'video',
				src: '/videos/disfraces_ratatuille.webm',
				alt: 'Nuestros disfraces de Ratatouille',
				date: ``,
				text: ``
			},
			{ type: 'photo', src: '/photos/nosotros8.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros9.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros10.webp', alt: 'Nosotros', date: ``, text: `` }
		]
	},
	{
		kind: 'nosotros',
		items: [
			{ type: 'photo', src: '/photos/nosotros11.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'video', src: '/videos/cafecito.webm', alt: 'Cafecito', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros12.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros13.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros14.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros15.webp', alt: 'Nosotros', date: ``, text: `` }
		]
	},
	{
		kind: 'nosotros',
		items: [
			{ type: 'photo', src: '/photos/nosotros16.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros17.webp', alt: 'Nosotros', date: ``, text: `` },
			{
				type: 'video',
				src: '/videos/starfire_robin_costumes.webm',
				alt: 'Starfire y Robin',
				date: ``,
				text: ``
			},
			{ type: 'photo', src: '/photos/nosotros18.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros19.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotro20.webp', alt: 'Nosotros', date: ``, text: `` }
		]
	},
	{
		kind: 'nosotros',
		items: [
			{ type: 'photo', src: '/photos/nosotros21.webp', alt: 'Nosotros', date: ``, text: `` },
			{
				type: 'video',
				src: '/videos/pumpinking_video.webm',
				alt: 'Pumpkin King',
				date: ``,
				text: ``
			},
			{ type: 'photo', src: '/photos/nosotros22.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros23.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros24.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros25.webp', alt: 'Nosotros', date: ``, text: `` }
		]
	},
	{
		kind: 'nosotros',
		items: [
			{ type: 'photo', src: '/photos/nosotros26.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros27.webp', alt: 'Nosotros', date: ``, text: `` },
			{
				type: 'video',
				src: '/videos/laguito_us_slomo.webm',
				alt: 'Laguito en cámara lenta',
				date: ``,
				text: ``
			},
			{ type: 'photo', src: '/photos/nosotros28.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros29.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'video', src: '/videos/filtro.webm', alt: 'Con filtro', date: ``, text: `` }
		]
	},
	{
		kind: 'nosotros',
		items: [
			{ type: 'photo', src: '/photos/nosotros30.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros31.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros32.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros33.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros34.webp', alt: 'Nosotros', date: ``, text: `` },
			{ type: 'photo', src: '/photos/nosotros35.webp', alt: 'Nosotros', date: ``, text: `` }
		]
	},
	{
		kind: 'ella',
		items: [
			{ type: 'photo', src: '/photos/ella.webp', alt: 'Rosario', date: ``, text: `` },
			{ type: 'photo', src: '/photos/ella1.webp', alt: 'Rosario', date: ``, text: `` },
			{ type: 'photo', src: '/photos/ella2.webp', alt: 'Rosario', date: ``, text: `` },
			{ type: 'photo', src: '/photos/ella3.webp', alt: 'Rosario', date: ``, text: `` }
		]
	}
];
