<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { tick } from 'svelte';

	let video: HTMLVideoElement;
	let started = false;
	async function start() {
		try {
			let mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
			started = true;
			await tick();
			video.srcObject = mediaStream;
		} catch (e) {
			console.log('Unable to acquire screen capture: ' + e);
		}
	}
</script>

{#if started}
	<video bind:this={video} autoplay class="w-full max-h-screen">
		<track kind="captions" />
	</video>
{:else}
	<div class="m-4 flex gap-4">
		<Button on:click={start} color="blue">Start</Button>
	</div>
{/if}
