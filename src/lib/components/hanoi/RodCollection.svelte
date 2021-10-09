<script lang="ts">
	import Rod from './Rod.svelte';
	export let height: number;
	export let rods: number[][];
</script>

<div
	class="m-auto w-[fit-content] max-w-full shadow-md rounded px-12 pt-6 pb-8 mb-4 flex gap-3 bg-gray-400 overflow-x-auto relative"
>
	{#each rods as stack}
		<Rod {stack} {height} />
	{/each}
	<div class="absolute left-6 right-6 bottom-5 h-3  bg-gray-800" />
</div>
