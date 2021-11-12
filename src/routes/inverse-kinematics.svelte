<script lang="ts">
	import pannable from '$lib/actions/pannable';

	import { onMount } from 'svelte';

	type Point = { x: number; y: number };
	let h = 4000;
	let distances = [50, 50, 100, 70, 50];
	let angles = [0, 0, 0, 0, 0];
	let target = { x: 200, y: 200 };
	$: length = angles.length;
	$: cummulativeAngles = [];
	$: {
		cummulativeAngles = [0];
		for (let i = 0; i < length; i++) {
			cummulativeAngles.push(cummulativeAngles[i] + angles[i]);
		}
		cummulativeAngles.shift();
	}
	let beginPos: Point = { x: 0, y: 0 };
	let nodePositions: Point[] = [];
	$: {
		nodePositions = [beginPos];
		for (let i = 0; i < distances.length; i++) {
			nodePositions.push({
				x: nodePositions[i].x + distances[i] * Math.cos(toRadian(cummulativeAngles[i])),
				y: nodePositions[i].y + distances[i] * Math.sin(toRadian(cummulativeAngles[i]))
			});
		}
	}
	$: endNode = nodePositions[length];
	function toRadian(d: number) {
		return (d * Math.PI) / 180;
	}

	/* Step Two */
	function GetDeltaOrientation() {
		let Jt = GetJacobianTranspose();
		let dO = multiply(Jt, [target.x - endNode.x, target.y - endNode.y]);
		return dO;
	}

	/* Step Three */
	function GetJacobianTranspose() {
		let J: number[][] = [];
		for (let i = 0; i < length; i++) {
			J.push([nodePositions[i].y - endNode.y, endNode.x - nodePositions[i].x]);
		}
		return J;
	}
	function multiply(mat: number[][], vec: number[]) {
		let arr = new Array<number>(mat.length).fill(0);
		for (let i = 0; i < mat.length; i++) {
			for (let j = 0; j < mat[i].length; j++) {
				arr[i] += vec[j] * mat[i][j];
			}
		}
		return arr;
	}
	function updateTarget({ detail }) {
		target = {
			x: detail.rx,
			y: detail.ry
		};
	}
	onMount(() => {
		setInterval(() => {
			/* Step One */
			let dO = GetDeltaOrientation();
			for (let i = 0; i < length; i++) {
				angles[i] += dO[i] / h;
			}
		}, 0);
	});
</script>

<svelte:head>
	<title>Inverse Kinematics | tomasajt.xyz</title>
</svelte:head>
<div class="h-screen p-4 relative">
	<div class="absolute top-0">
		<h1 class="text-3xl font-bold">Inverse Kinematics demo</h1>
		<p>Drag the blue dot to control the arm</p>
		<p>
			Based on the article found <a
				href="https://www.gamedeveloper.com/programming/3-simple-steps-to-implement-inverse-kinematics"
				rel="external"
				class="text-blue-900 underline">here</a
			>
		</p>
		<p>Scroll down to edit parameters</p>
	</div>

	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		use:pannable
		on:panmove={updateTarget}
		on:panstart={updateTarget}
	>
		{#each nodePositions as pos, i}
			{#if i < length}
				<div
					class="absolute -translate-y-1/2 h-[10px] bg-black"
					style="
                width: {distances[i]}px;
                top: {pos.y}px;
                left: {pos.x}px;
                --tw-rotate: {cummulativeAngles[i]}deg;
                transform-origin: left center"
				/>
			{/if}
			<div
				class="absolute -translate-x-1/2 -translate-y-1/2 rounded-[50%] w-[20px] h-[20px] bg-red-600"
				style="top: {pos.y}px; left: {pos.x}px"
			/>
		{/each}
		<div
			class="absolute z-50 -translate-x-1/2 -translate-y-1/2 rounded-[50%] w-[20px] h-[20px] bg-blue-500"
			style="top: {target.y}px; left: {target.x}px"
		/>
	</div>
</div>

<div class="p-4">
	<div class="mb-4">
		<h2 class="text-2xl mb-4">Angles</h2>
		{#each Array(length) as _, i}
			<div class="inline-block">
				<span class="block">{angles[i]}°</span>
				<input
					type="range"
					class="border border-black"
					bind:value={angles[i]}
					min={0}
					max={360}
					step={1}
				/>
			</div>
		{/each}
	</div>
	<div class="mb-4">
		<h2 class="text-2xl mb-4">Lengths</h2>
		{#each Array(length) as _, i}
			<div class="inline-block">
				<span class="block">{distances[i]}px</span>
				<input
					type="range"
					class="border border-black"
					bind:value={distances[i]}
					min={0}
					max={200}
					step={1}
				/>
			</div>
		{/each}
	</div>
	<div class="mb-4">
		<h2 class="text-2xl mb-4">Timestep (slide right to decrease jitter, but slower simulation)</h2>
		<div class="inline-block">
			<span class="block">1/{h} timestep</span>
			<input
				type="range"
				class="border border-black"
				bind:value={h}
				min={100}
				max={10000}
				step={1}
			/>
		</div>
	</div>
</div>
