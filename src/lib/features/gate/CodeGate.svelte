<script lang="ts">
	import { ACCESS_CODE } from '#lib/config.ts';

	/** Se llama (dentro del gesto de la persona) cuando el código es correcto. */
	let { onunlock }: { onunlock: () => void } = $props();

	let code = $state('');
	let wrong = $state(false);

	function check() {
		if (code === ACCESS_CODE) return onunlock();
		wrong = true;
		code = '';
	}

	function oninput() {
		code = code.replace(/\D/g, '').slice(0, ACCESS_CODE.length);
		wrong = false;
		// Al completar los dígitos se revisa solo (sin tener que pulsar el botón).
		if (code.length === ACCESS_CODE.length) check();
	}
</script>

<section
	class="calm-bg relative z-10 flex min-h-svh flex-col items-center justify-center gap-6 px-5 py-12 text-center"
>
	<div class="flex max-w-md flex-col gap-2">
		<p class="text-base font-semibold tracking-[0.16em] text-plum uppercase">Solo para ti</p>
		<h1 class="text-[clamp(34px,9vw,56px)] leading-[1.1] font-bold text-berry">
			Escribe el código secreto
		</h1>
	</div>

	<form
		class="flex w-full max-w-xs flex-col items-center gap-4"
		onsubmit={(e) => {
			e.preventDefault();
			check();
		}}
	>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			bind:value={code}
			{oninput}
			type="password"
			inputmode="numeric"
			pattern="[0-9]*"
			autocomplete="off"
			autofocus
			maxlength={ACCESS_CODE.length}
			aria-label="Código"
			aria-invalid={wrong}
			placeholder="••••••"
			class="w-full rounded-[22px] border-2 border-petal bg-cream/80 px-4 py-3 text-center text-[clamp(32px,9vw,44px)] font-bold tracking-[0.4em] text-berry tabular-nums shadow-[0_6px_0_var(--color-candy)] outline-none placeholder:text-rose/60 focus:border-rose"
			class:shake={wrong}
		/>
		<p class="min-h-6 text-base font-semibold text-plum" aria-live="polite">
			{wrong ? 'Mmm… ese no es. Intenta otra vez 💗' : ''}
		</p>
		<button
			type="submit"
			class="cursor-pointer rounded-full bg-berry px-8 py-3 text-lg font-bold text-cream shadow-[0_5px_0_var(--color-plum)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
		>
			Entrar
		</button>
	</form>
</section>

<style>
	.shake {
		animation: shake 0.4s ease-in-out;
	}
	@keyframes shake {
		20%,
		60% {
			transform: translateX(-8px);
		}
		40%,
		80% {
			transform: translateX(8px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.shake {
			animation: none;
		}
	}
</style>
