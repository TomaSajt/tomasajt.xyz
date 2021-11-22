<script lang="ts">
import Button from "$lib/components/Button.svelte";
    let video;
    let speed = 100;
    $: hundrethSpeed = speed / 100;
</script>
<svelte:head>
    <title>Rick Speed</title>
</svelte:head>
    <video class="max-w-screen-lg mx-auto" controls bind:playbackRate={hundrethSpeed} bind:this={video} loop>
        <source src="https://marci.hvj.hu/videos/rickroll.mp4">
        <track kind="captions">
    </video>
    <div class="flex flex-col mx-auto max-w-screen-lg">
        <label for="speed">{speed}%</label>
        <input id="speed" type="range" bind:value={speed} min=10 max=400>
        <div>
            <Button onClick={()=>{
                video.preservesPitch = !video.preservesPitch;
            }}>Preserve pitch</Button>
        </div>
    </div>
<style lang="postcss">
    
</style>