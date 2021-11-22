<script lang="ts">
	import type { TupleCtorMap, TypeList } from './_colb';
	export let inputTypes: TypeList;
	$: len = inputTypes.length;
	let values: any[] = new Array(len);
    $: console.log(values);
</script>

<div class="bg-yellow-400 flex p-4">
	{#each inputTypes as type, i}
		{#if type == Number}
			<input type="number" bind:value={values[i]} />
        {:else if type == String}
            <input type="text" bind:value={values[i]} />
        {:else if type == Boolean}
            <input type="checkbox" bind:checked={values[i]} />
        {/if}
	{/each}
</div>
