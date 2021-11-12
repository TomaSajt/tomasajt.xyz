<script lang="ts">
	let playbackRate = 1;
</script>

<svelte:head>
	<title>Rickspeed</title>
</svelte:head>
<div class="max-w-screen-2xl p-6 mx-auto">
	<video class="w-full mb-4" bind:playbackRate loop controls>
		<source src="https://marci.hvj.hu/videos/rickroll.mp4" />
		<track kind="captions" />
	</video>
	<div class="flex items-center gap-4">
		<input id="speed" type="range" bind:value={playbackRate} min="0.25" max="4" step="0.01" />
		<label for="speed" class="mr-4">{Math.round(100 * playbackRate)}%</label>
	</div>
</div>

<style lang="postcss">
</style>
