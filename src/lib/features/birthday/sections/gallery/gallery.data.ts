/**
 * Galería: cada página es una escena (6 elementos; "ella" tiene 4). Fotos en `static/photos/`,
 * videos en `static/videos/`.
 *
 * Para personalizar un elemento, llena su `date` (se ve en la tarjeta y en primer plano) y su
 * `text` (solo en primer plano). Con `` (vacío) no se muestra nada.
 * Escríbelos entre comillas invertidas (`...`): así puedes usar ' y " y hasta saltos de línea. El orden de aquí es el de la página (cronológico).
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
				src: '/photos/nosotros3.webp',
				alt: 'Nosotros',
				date: `27/Sep/25`,
				text: `Cuando encontramos tu lugar favorito de Matcha y jugamos boliche 🎳`
			},
			{
				type: 'photo',
				src: '/photos/nosotros15.webp',
				alt: 'Nosotros',
				date: `27/Sep/25`,
				text: `Cuando jugamos boliche, y lo diste todo 🎳`
			},
			{
				type: 'photo',
				src: '/photos/nosotros8.webp',
				alt: 'Nosotros',
				date: `25/Oct/25`,
				text: `Nuestra primera fiesta de Halloween en pareja ✨`
			},
			{
				type: 'video',
				src: '/videos/starfire_robin_costumes.webm',
				alt: 'Starfire y Robin',
				date: `25/Oct/25`,
				text: `Nuestros disfraces de pareja estuvieron divinos 🙌`
			},
			{
				type: 'photo',
				src: '/photos/nosotros28.webp',
				alt: 'Nosotros',
				date: `25/Oct/25`,
				text: `Una foto muy linda portando muy lindos disfraces, gracias a su elección 🙂‍↕️ ✨`
			},
			{
				type: 'video',
				src: '/videos/disfraces_ratatuille.webm',
				alt: 'Nuestros disfraces de Ratatouille',
				date: `31/Oct/25`,
				text: `Me encantaron las orejitas que te hizo tu mami ✨ jaja`
			}
		]
	},
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros10.webp',
				alt: 'Nosotros',
				date: `12/Nov/25`,
				text: `Mi abotonamiento en Rotaract jeje ✨`
			},
			{
				type: 'video',
				src: '/videos/laguito_us_2.webm',
				alt: 'Nosotros en el Laguito',
				date: `17/Nov/25`,
				text: `Nuestra salida post-cumple, te veías preciosa en ese vestido ✨`
			},
			{
				type: 'video',
				src: '/videos/laguito_us_slomo.webm',
				alt: 'Laguito en cámara lenta',
				date: `17/Nov/25`,
				text: `Usted luciendo espectacular con ese vestido en el lugar donde usted aceptó ser mi novia ✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros11.webp',
				alt: 'Nosotros',
				date: `22/Nov/25`,
				text: `Una cita con panecito y café✨`
			},
			{
				type: 'video',
				src: '/videos/filtro.webm',
				alt: 'Con filtro',
				date: `21/Dic/25`,
				text: `Probándonos filtros en el auto, usted ya tenía algo de sueño, pero seguías dandolo todo 🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros29.webp',
				alt: 'Nosotros',
				date: `03/Ene/26`,
				text: `Una fotito en las Grutas de García, en nuestro primer viajecito ✨`
			}
		]
	},
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros30.webp',
				alt: 'Nosotros',
				date: `03/Ene/26`,
				text: `Una fotito después de pasar un día en un centro comercial en Monterrey y Acualandia Cuack 🦆✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros31.webp',
				alt: 'Nosotros',
				date: `04/Ene/26`,
				text: `Visitando Bioparque Estrella con usted jeje ✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros32.webp',
				alt: 'Nosotros',
				date: `01/Feb/26`,
				text: `En tu abotonamiento como miembro formal de tu club Rotaract ✨🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros4.webp',
				alt: 'Nosotros',
				date: `14/Feb/26`,
				text: `Nuestra cena de celebración de San Valentín ❤️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros6.webp',
				alt: 'Nosotros',
				date: `14/Feb/26`,
				text: `Nuestra cena de celebración de San Valentín ❤️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros1.webp',
				alt: 'Nosotros',
				date: `28/Feb/26`,
				text: `Nuestro primer evento como pareja en tu iglesia, estaba un poco nervioso pero todo salió muy bonito.🙏`
			}
		]
	},
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros12.webp',
				alt: 'Nosotros',
				date: `28/Feb/26`,
				text: `Cuando fuimos a apoyar a tu club en Brownsville ✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros5.webp',
				alt: 'Nosotros',
				date: `12/Abr/26`,
				text: `Un cafecito después del viaje a Reynosa ✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros13.webp',
				alt: 'Nosotros',
				date: `27/Abr/26`,
				text: `En la fiesta de Argenis jaja✨ Donde hicimos un TikTok :b`
			},
			{
				type: 'photo',
				src: '/photos/nosotros14.webp',
				alt: 'Nosotros',
				date: `02/May/26`,
				text: `Una cena rotaractiana donde usted se veía espectacular (como de costumbre) 🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros33.webp',
				alt: 'Nosotros',
				date: `02/May/26`,
				text: `Una fotito muy linda de ustedes y yo en la cena Rotaractiana 🙂‍↕️✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros16.webp',
				alt: 'Nosotros',
				date: `04/Jul/26`,
				text: `En la boda de un familiar suyo, donde también grabamos un lindo video musical 🙂‍↕️✨`
			}
		]
	},
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros35.jpeg',
				alt: 'Nosotros',
				date: `15/Jun/26`,
				text: `Compartiendome algo de su pasion futbolistica y unos buenos taquitos 🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros17.webp',
				alt: 'Nosotros',
				date: `12/Jul/26`,
				text: `Celebrando nuestro mesesario con una comidita 🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros18.webp',
				alt: 'Nosotros',
				date: `12/Jul/26`,
				text: `Más fotitos de nuestro mesesario número 9 🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros9.webp',
				alt: 'Nosotros',
				date: `31/Jul/26`,
				text: `Cita en cine para Spider-Man: Brand New Day 🕷️🤟`
			},
			{
				type: 'photo',
				src: '/photos/nosotros19.webp',
				alt: 'Nosotros',
				date: `06/Ago/26`,
				text: `Cuando tú y mi mamá me hicieron una muy bonita fiesta sorpresa✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros35.webp',
				alt: 'Nosotros',
				date: `30/Ago/26`,
				text: `Nuestra clásica recreación de la primera foto/avistamiento de nosotros 2 en la fiesta donde nos conocimos jeje✨`
			}
		]
	},
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros34.webp',
				alt: 'Nosotros',
				date: `08/Sep/26`,
				text: `Disfrutando un Matcha muy rico, tan así que se convirtió en tu segundo lugar fav ✨ y primero de la ciudad 🙌`
			},
			{
				type: 'video',
				src: '/videos/cafecito.webm',
				alt: 'Cafecito',
				date: `11/Oct/26`,
				text: `Una cita de cafecito muy bella🙂‍↕️`
			},
			{
				type: 'photo',
				src: '/photos/nosotros21.webp',
				alt: 'Nosotros',
				date: `11/Oct/26`,
				text: `Una salidita muy linda de cafecito por nuestro mesesario ✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros7.webp',
				alt: 'Nosotros',
				date: `19/Oct/26`,
				text: `Una sesión de fotos inesperada, de alguien inesperado jaja`
			},
			{
				type: 'video',
				src: '/videos/pumpinking_video.webm',
				alt: 'Pumpkin King',
				date: `25/Oct/26`,
				text: `Una salidita muy bella al Pumpkin patch 🎃`
			},
			{
				type: 'photo',
				src: '/photos/nosotros22.webp',
				alt: 'Nosotros',
				date: `25/Oct/26`,
				text: `Te queda perfecta la temporada otoñal✨`
			}
		]
	},
	{
		kind: 'nosotros',
		items: [
			{
				type: 'photo',
				src: '/photos/nosotros23.webp',
				alt: 'Nosotros',
				date: `25/Oct/26`,
				text: `Juntos disfrutando el momento 🙂‍↕️🎃`
			},
			{
				type: 'photo',
				src: '/photos/nosotros24.webp',
				alt: 'Nosotros',
				date: `25/Oct/26`,
				text: `Probando besos de calabaza 🎃`
			},
			{
				type: 'photo',
				src: '/photos/nosotros2.webp',
				alt: 'Nosotros',
				date: `31/Oct/26`,
				text: `La segunda noche de brujas consecutiva con disfraces de pareja 🫰`
			},
			{
				type: 'photo',
				src: '/photos/nosotros25.webp',
				alt: 'Nosotros',
				date: `31/Oct/26`,
				text: `Yo consintiéndola una vez que terminó de ponerse su disfraz para Halloween✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros26.webp',
				alt: 'Nosotros',
				date: `31/Oct/26`,
				text: `Una fotito muy linda de ambos en la fiesta de Mime, una de las 3 fiestas a las que fuimos ese día 🙏✨`
			},
			{
				type: 'photo',
				src: '/photos/nosotros27.webp',
				alt: 'Nosotros',
				date: `01/Nov/26`,
				text: `La tercera fiestecita, donde nos pegó duro el cambio de horario jaj`
			}
		]
	},
	{
		kind: 'ella',
		items: [
			{ type: 'photo', src: '/photos/ella.webp', alt: 'Rosario', date: `En`, text: `los dias de luz, y los atardeceres ✨ ` },
			{ type: 'photo', src: '/photos/ella1.webp', alt: 'Rosario', date: `Cada`, text: `vez que te veo ❤️👀` },
			{ type: 'photo', src: '/photos/ella2.webp', alt: 'Rosario', date: `Momento`, text: `segundo, milesima... todo el tiempo ✨` },
			{ type: 'photo', src: '/photos/ella3.webp', alt: 'Rosario', date: `❤️`, text: `Te amo, amorcito🫰` }
		]
	}
];
