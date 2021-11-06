<script lang="ts">
import Button from "$lib/components/Button.svelte";
    let video;
    let speed = 100;
    $: hundrethSpeed = speed / 100;
</script>
<svelte:head>
    <title>Rick Speed</title>
</svelte:head>
    <video controls bind:playbackRate={hundrethSpeed} bind:this={video}>
        <source src="https://marci.hvj.hu/videos/rickroll.mp4">
        <track kind="captions">
    </video>
    <div class="flex w-[min-content] mx-auto items-center flex-wrap">
        <div>
            <label for="speed" class="mr-4">{speed}%</label>
            <input id="speed" type="range" bind:value={speed} min=10 max=1000>
        </div>
        <div>
            <Button onClick={()=>{
                video.preservesPitch = !video.preservesPitch;
            }}>Preserve pitch</Button>
        </div>
    </div>
<style lang="postcss">
    
</style>