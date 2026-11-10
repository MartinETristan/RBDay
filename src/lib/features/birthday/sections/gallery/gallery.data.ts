/**
 * Galería: cada página es una escena. Fotos en `static/photos/`, videos en `static/videos/`.
 * Las páginas de "nosotros" solo llevan fotos `nosotros*`; "ella" tiene su propia escena.
 */
export type GalleryItem = { type: 'photo' | 'video'; src: string; alt: string };
export type GalleryPage = { kind: 'nosotros' | 'ella'; items: GalleryItem[] };

const photo = (name: string, alt: string): GalleryItem => ({
	type: 'photo',
	src: `/photos/${name}.webp`,
	alt
});
const video = (name: string, alt: string): GalleryItem => ({
	type: 'video',
	src: `/videos/${name}.webm`,
	alt
});

// nosotros1 … nosotros29 (el archivo del 20 se llama `nosotro20`).
const us = Array.from({ length: 29 }, (_, i) =>
	photo(i + 1 === 20 ? 'nosotro20' : `nosotros${i + 1}`, 'Nosotros')
);

const videos = [
	video('laguito_us_2', 'Nosotros en el Laguito'),
	video('disfraces_ratatuille', 'Nuestros disfraces de Ratatouille'),
	video('cafecito', 'Cafecito'),
	video('starfire_robin_costumes', 'Starfire y Robin'),
	video('pumpinking_video', 'Pumpkin King'),
	video('laguito_us_slomo', 'Laguito en cámara lenta'),
	video('filtro', 'Con filtro')
];

// 6 páginas de 6: 5 fotos + 1 video (la última, 4 fotos + 2 videos).
const nosotros: GalleryPage[] = Array.from({ length: 6 }, (_, p) => {
	const shots = us.slice(p * 5, p === 5 ? undefined : p * 5 + 5);
	const clips = p === 5 ? videos.slice(5) : [videos[p]];
	const items = [...shots];
	clips.forEach((c, k) => items.splice(1 + k * 3 + (p % 2), 0, c));
	return { kind: 'nosotros', items };
});

const ella: GalleryPage = {
	kind: 'ella',
	items: ['ella', 'ella1', 'ella2', 'ella3'].map((n) => photo(n, 'Rosario'))
};

export const galleryPages: GalleryPage[] = [...nosotros, ella];
