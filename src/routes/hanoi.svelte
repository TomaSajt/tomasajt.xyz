<script lang="ts">
	import Button from '$lib/components/Button.svelte';

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
	let height = 5;
	let sleepTime = 200;
	let running = false;
	let _from = 0;
	let _to = 2;
	$: clampFrom(_from);
	$: clampTo(_to);
	$: avoidCollisionWithFrom(_from);
	$: avoidCollisionWithTo(_to);
	$: selectedUsing = theThirdOption(_to, _from);
	$: rods = defaultRods(height, _from);

	function defaultRods(n: number, k: number): number[][] {
		let arr = [[], [], []];
		arr[k] = invRange(n);
		return arr;
	}
	function clampFrom(_: number) {
		_from = Math.max(Math.min(2, _from), 0);
	}
	function clampTo(_: number) {
		_to = Math.max(Math.min(2, _to), 0);
	}
	function avoidCollisionWithFrom(_: number): void {
		if (_from == _to) {
			if (_from != 0) _to--;
			else _to++;
		}
	}
	function avoidCollisionWithTo(_: number): void {
		if (_to == _from) {
			if (_to != 0) _from--;
			else _from++;
		}
	}
	function getColor(n: number): string {
		let mod = colors.length;
		return colors[((n % mod) + mod) % mod];
	}
	async function hanoi(n: number, from: number, to: number, using: number): Promise<void> {
		if (n > 0) {
			await hanoi(n - 1, from, using, to);
			move(from, to);
			await sleep(sleepTime);
			await hanoi(n - 1, using, to, from);
		}
	}
	function move(from: number, to: number): void {
		rods[to].push(rods[from].pop());
		rods = rods;
	}
	function sleep(n: number): Promise<void> {
		return new Promise((res) => setTimeout(res, n));
	}
	function invRange(n: number): number[] {
		let arr = [];
		for (let i = n; i > 0; i--) {
			arr.push(i);
		}
		return arr;
	}
	function theThirdOption(n: number, k: number): number {
		return n == 0 ? (k == 1 ? 2 : 1) : n == 1 ? (k == 0 ? 2 : 0) : k == 0 ? 1 : 0;
	}
	async function solve() {
		if (running) return;
		running = true;
		rods = defaultRods(height, _from);
		await hanoi(height, _from, _to, selectedUsing);
		let temp = _from;
		_from = _to;
		_to = temp;
		running = false;
	}
</script>

<svelte:head>
	<title>Hanoi | tomasajt.xyz</title>
</svelte:head>

<div class="mx-auto my-3 w-full max-w-xs">
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-6">
			<div class="mb-4">
				<div class="flex justify-between">
					<label for="height">Height</label>
					<span class="block tracking-wide text-gray-700 text-xs font-bold mb-2">{height}</span>
				</div>
				<input
					class="block w-full"
					id="height"
					type="range"
					min="1"
					max="20"
					disabled={running}
					bind:value={height}
				/>
			</div>
			<div class="mb-4">
				<div class="flex justify-between">
					<label for="sleepTime">Sleep Time</label>
					<span class="block tracking-wide text-gray-700 text-xs font-bold mb-2">{sleepTime}ms</span
					>
				</div>

				<input
					class="block w-full"
					id="sleepTime"
					type="range"
					min="0"
					max="500"
					bind:value={sleepTime}
				/>
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-3">
			<div class="w-1/3 px-3 mb-4">
				<label for="from">From</label>
				<input id="from" type="number" disabled={running} min="0" max="2" bind:value={_from} />
			</div>
			<div class="w-1/3 px-3 mb-4">
				<label for="from">To</label>
				<input id="from" type="number" disabled={running} min="0" max="2" bind:value={_to} />
			</div>
			<div class="w-1/3 px-3 mb-4">
				<label for="from">Using</label>
				<input id="from" type="number" disabled min="0" max="2" bind:value={selectedUsing} />
			</div>
		</div>
		<div class="flex items-center justify-between">
			<Button onClick={solve} disabled={running} >Solve</Button>
		</div>
	</form>
</div>

<div
	class="m-auto w-[fit-content] max-w-full shadow-md rounded px-8 pt-6 pb-8 mb-4 flex gap-3 bg-gray-400 overflow-x-auto"
>
	{#each rods as stack}
		<div
			class="stack flex flex-col-reverse flex-shrink-0 relative"
			style="width:{36 * height}px;height:{24 * (height + 1)}px"
		>
			<div class="absolute bg-black top-0 bottom-0 w-3 left-1/2 -translate-x-1/2" />
			{#each stack as val}
				<div
					class="mx-auto h-6 flex items-center justify-center z-10"
					style="width:{val * 36}px; background-color: {getColor(
						val
					)}; box-shadow: inset 0 0 0 1px black;"
				>
					<span class="font-bold ">{val}</span>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	input:disabled {
		@apply opacity-75;
	}
	input[type='range'] {
		@apply cursor-pointer;
	}
	input[type='number'] {
		@apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight;
	}
	input[type='number']:focus {
		@apply outline-none bg-white border-gray-500;
	}
	label {
		@apply block tracking-wide text-gray-700 text-xs font-bold uppercase mb-2;
	}
</style>
