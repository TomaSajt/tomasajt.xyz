<script lang="ts">
	export let icons: {
		src: string;
		alt: string;
		href: string;
	}[];
	export let initialDelay = 0;
	export let delay = 1000;
</script>

<div class="relative h-32 flex justify-center gap-4">
	{#each icons as { src, alt, href }, i}
		<a {href}>
			<img
				{src}
				{alt}
				class="rendering-pixelated w-32 h-32 max-w-none translate-y-20 opacity-0 object-contain"
				style="animation-delay: {i * delay + initialDelay}ms;"
			/>
		</a>
	{/each}
</div>

<style lang="postcss">
	img {
		animation: slide 2s forwards ease-out;
	}

	@keyframes slide {
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
