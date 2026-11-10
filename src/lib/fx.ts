/** Generadores deterministas (sin Math.random) para que SSR e hidratación coincidan. */

const glitterColors = ['#FFFFFF', '#FFE08A', '#FFF6FA', '#FFD3E4', '#FFD76A'];

export const sparkles = Array.from({ length: 46 }, (_, i) => {
	const dot = i % 3 === 0;
	const size = dot ? 4 + (i % 3) * 2 : 9 + ((i * 5) % 15);
	return {
		dot,
		style:
			`left:${(i * 37 + 11) % 100}%;top:${(i * 53 + 7) % 100}%;` +
			`width:${size}px;height:${size}px;background:${glitterColors[i % glitterColors.length]};` +
			`animation-delay:-${((i * 0.7) % 3).toFixed(1)}s;` +
			`animation-duration:${(2 + (i % 4) * 0.8).toFixed(1)}s;` +
			`filter:drop-shadow(0 0 3px rgba(255,255,255,.9))`
	};
});

export const hearts = Array.from({ length: 9 }, (_, i) => {
	const size = 22 + ((i * 11) % 30);
	return {
		style:
			`left:${(i * 41 + 6) % 92}%;top:100%;width:${size}px;height:${Math.round(size * 0.92)}px;` +
			`opacity:.9;animation-duration:${14 + (i % 5) * 3}s;` +
			`animation-delay:-${((i * 3.3) % 14).toFixed(1)}s`
	};
});

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

/** 120 piezas: dos cañones (esquinas de abajo) y uno al centro. */
export const confetti = Array.from({ length: 120 }, (_, i) => {
	const src = i % 3;
	const spread = 60 + ((i * 53) % 320);
	const dx = src === 0 ? spread : src === 1 ? -spread : ((i * 61) % 400) - 200;
	const dy = -(260 + ((i * 37) % 420));
	const w = 7 + ((i * 5) % 8);
	const h = i % 3 === 0 ? w : w * 1.9;
	const left = src === 0 ? '0%' : src === 1 ? '100%' : '50%';
	const delay = ((i * 13) % 50) / 100 + (src === 2 ? 0.25 : 0);
	return (
		`left:${left};width:${w}px;height:${h}px;border-radius:${i % 3 === 0 ? '50%' : '2px'};` +
		`background:${confettiColors[i % confettiColors.length]};` +
		`--dx:${dx}px;--dy:${dy}px;--fall:${90 + ((i * 29) % 160)}px;--rot:${400 + ((i * 47) % 700)}deg;` +
		`animation-duration:${(3 + (i % 5) * 0.35).toFixed(2)}s;animation-delay:${delay.toFixed(2)}s`
	);
});
