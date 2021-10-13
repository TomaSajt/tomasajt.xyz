<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const urlParams = $page.query;
	const url = urlParams.get('image') ?? '/assets/karesz.png';
	onMount(() => {
		const img = new Image();
		img.addEventListener('load', function () {
		console.log("asd")
			bgSize =
				window.innerWidth * this.naturalHeight > window.innerHeight * this.naturalWidth
					? window.innerHeight
					: window.innerWidth;
		});
		img.crossOrigin = 'anonymous'
		img.src = url;
	});
	let bgSize = 0;
</script>

<div
	style="background-image: url({url}); background-size: {bgSize}px auto"
	class="w-full h-screen"
/>

<style lang="postcss">
	div {
		background-repeat: no-repeat;
		image-rendering: pixelated;
		background-position: 50% 50%;
	}
</style>
