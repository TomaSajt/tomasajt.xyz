<script lang="ts">
	export let text = '';
	export let disabled = false;
	export let value: number;
	export let min = 0;
	export let max = 100;
	export let id: string | undefined = undefined;
</script>

<label class="block tracking-wide text-gray-700 text-xs font-bold uppercase mb-2" for={id}
	>{text}</label
>
<input
	class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
	{id}
	type="number"
	{disabled}
	{min}
	{max}
	bind:value
/>
