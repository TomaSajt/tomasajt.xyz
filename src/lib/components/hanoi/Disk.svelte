<script lang="ts">
	export let size: number;

	const colors = [
		'Red',
		'DodgerBlue',
		'Orange',
		'Green',
		'Gold',
		'DarkOrchid',
		'LawnGreen',
		'Violet',
		'RoyalBlue',
		'MediumTurquoise'
	];

	function getColor(n: number): string {
		let mod = colors.length;
		return colors[((n % mod) + mod) % mod];
	}
</script>

<div
	class="mx-auto h-6 flex items-center justify-center z-10"
	style="width:{size * 36}px; background-color: {getColor(size)};"
>
	<span class="font-bold ">{size}</span>
</div>
