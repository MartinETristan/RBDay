<script lang="ts">
	import { reveal } from '#lib/shared/actions/reveal.ts';
	import Scene from '#lib/shared/ui/Scene.svelte';
	import { letter } from './letter.data.ts';
</script>

<Scene id="carta" title="Tu carta" class="bg-[#f7b3cf]">
	<article
		use:reveal
		class="flex w-full max-w-180 flex-col gap-4 rounded-[28px] bg-cream p-[clamp(24px,6vw,56px)] text-left shadow-[0_10px_0_var(--color-rose-deep)] horiz:gap-[1.8svh] horiz:p-[clamp(24px,5svh,56px)]"
	>
		<p
			class="font-hand text-[44px] leading-none font-bold text-plum horiz:text-[clamp(34px,6svh,52px)]"
		>
			{letter.greeting}
		</p>
		{#each letter.paragraphs as para, i (i)}
			<p class="text-[18px] leading-[1.65] horiz:text-[clamp(15px,2.4svh,20px)]">{para}</p>
		{/each}
		<p class="mt-1 text-right font-hand text-[32px] font-bold horiz:text-[clamp(26px,4.4svh,38px)]">
			{letter.signoff}<br />{letter.author}
		</p>
	</article>
</Scene>
