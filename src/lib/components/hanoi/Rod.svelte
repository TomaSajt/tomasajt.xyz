<script lang="ts">
	import Disk from './Disk.svelte';

	export let stack: number[];
	export let height: number;
</script>

<div
	class="stack flex flex-col-reverse flex-shrink-0 relative"
	style="width:{36 * height}px;height:{24 * (height + 1)}px"
>
	<div class="absolute top-0 bottom-0 w-2 left-1/2 -translate-x-1/2 bg-gray-800" />
	{#each stack as size}
		<Disk {size} />
	{/each}
</div>
