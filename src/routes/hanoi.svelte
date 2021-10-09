<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import LabeledNumber from '$lib/components/form/LabeledNumber.svelte';
	import LabeledRange from '$lib/components/form/LabeledRange.svelte';
	import Disk from '$lib/components/hanoi/Disk.svelte';
	import Rod from '$lib/components/hanoi/Rod.svelte';
	import RodCollection from '$lib/components/hanoi/RodCollection.svelte';

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

<Form>
	<LabeledRange
		id="height"
		leftText="Height"
		bind:value={height}
		rightText={`${height}`}
		disabled={running}
		min={1}
		max={20}
	/>
	<LabeledRange
		id="sleepTime"
		leftText="Sleep Time"
		bind:value={sleepTime}
		rightText={`${sleepTime}ms`}
		min={1}
		max={500}
	/>
	<div class="flex gap-6 mb-4">
		<div class="w-1/3">
			<LabeledNumber id="from" text="From" disabled={running} min={0} max={2} bind:value={_from} />
		</div>
		<div class="w-1/3">
			<LabeledNumber id="to" text="To" disabled={running} min={0} max={2} bind:value={_to} />
		</div>
		<div class="w-1/3">
			<LabeledNumber id="using" text="Using" disabled min={0} max={2} value={selectedUsing} />
		</div>
	</div>
	<Button onClick={solve} disabled={running}>Solve</Button>
</Form>

<RodCollection {rods} {height} />

<style lang="postcss">
</style>
