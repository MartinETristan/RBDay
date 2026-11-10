/** Generación de tandas de confeti. */

const confettiColors = [
	'#FFB8D6',
	'#F29BBF',
	'#FFF6FA',
	'#1B2FA8',
	'#FFD76A',
	'#B9A6FF',
	'#8EE3C8',
	'#7FC8FF',
	'#FFC9DE',
	'#FFE08A'
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Una tanda de confeti con ángulos, fuerza, tamaños y tiempos al azar (distinta en cada llamada).
 * Sale de las dos esquinas de abajo y del centro. Solo llamar en el cliente.
 */
export function createConfetti(count = 120): string[] {
	return Array.from({ length: count }, () => {
		const src = Math.floor(Math.random() * 3);
		const power = rand(0.35, 1); // fuerza del disparo
		// ángulo medido desde la vertical: los cañones apuntan hacia adentro, el central abre en abanico
		const angle = src === 0 ? rand(10, 75) : src === 1 ? -rand(10, 75) : rand(-40, 40);
		const rad = (angle * Math.PI) / 180;
		const reach = 300 + power * 650;
		const dx = Math.sin(rad) * reach;
		const dy = -Math.cos(rad) * reach;
		const w = rand(7, 15);
		const h = Math.random() < 0.33 ? w : w * rand(1.4, 2.2);
		const left = src === 0 ? '0%' : src === 1 ? '100%' : `${rand(35, 65)}%`;
		return (
			`left:${left};width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;` +
			`border-radius:${h === w ? '50%' : '2px'};` +
			`background:${confettiColors[Math.floor(Math.random() * confettiColors.length)]};` +
			`--dx:${dx.toFixed(0)}px;--dy:${dy.toFixed(0)}px;--fall:${rand(60, 260).toFixed(0)}px;` +
			`--rot:${rand(300, 1100).toFixed(0)}deg;` +
			`animation-duration:${rand(2.8, 4.8).toFixed(2)}s;animation-delay:${rand(0, 0.7).toFixed(2)}s`
		);
	});
}
