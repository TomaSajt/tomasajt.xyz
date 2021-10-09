<script lang="ts">
	export let leftText = '';
	export let rightText = '';
	export let disabled = false;
	export let value: number;
	export let min = 0;
	export let max = 100;
	export let id: string | undefined = undefined;
</script>

<div class="mb-4">
	<div class="flex justify-between">
		<label class="block tracking-wide text-gray-700 text-xs font-bold uppercase mb-2" for={id}>
			{leftText}
		</label>
		<span class="block tracking-wide text-gray-700 text-xs font-bold mb-2">{rightText}</span>
	</div>
	<input
		class="block w-full cursor-pointer disabled:cursor-default"
		type="range"
		{id}
		{min}
		{max}
		{disabled}
		bind:value
	/>
</div>
