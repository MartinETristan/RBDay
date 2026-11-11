<script lang="ts">
	import { reveal } from '#lib/shared/actions/reveal.ts';

	let { kicker, title }: { kicker: string; title: string } = $props();
</script>

<div class="flex flex-col gap-1 text-center" use:reveal>
	<p
		class="font-hand text-[clamp(26px,6vw,36px)] font-bold text-plum horiz:text-[clamp(26px,4.4svh,38px)]"
	>
		{kicker}
	</p>
	<h2
		data-intro-target
		class="text-[clamp(34px,9vw,60px)] leading-[1.05] font-bold text-berry horiz:text-[clamp(34px,7.4svh,68px)]"
	>
		{title}
	</h2>
</div>
