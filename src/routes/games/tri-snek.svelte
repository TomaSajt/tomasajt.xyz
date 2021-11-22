<script lang="ts">
	import { onMount } from 'svelte';

	enum Dir {
		Right,
		RightUp,
		LeftUp,
		Left,
		LeftDown,
		RightDown
	}
	enum Side {
		Left,
		Right
	}
	type pos = { x: number; y: number; side: Side };
	let canvas: HTMLCanvasElement;
	const size = 50;
	let speed = 300;
	let d: Dir = Dir.Right;
	let segments: pos[] = [
		{ x: 3, y: 0, side: Side.Right },
		{ x: 3, y: 0, side: Side.Left },
		{ x: 2, y: 0, side: Side.Right },
		{ x: 2, y: 0, side: Side.Left },
		{ x: 1, y: 0, side: Side.Right },
		{ x: 1, y: 0, side: Side.Left },
		{ x: 0, y: 0, side: Side.Right },
		{ x: 0, y: 0, side: Side.Left }
	];

	onMount(start);

	function start() {
		setTimeout(gameTicker, speed);
		requestAnimationFrame(drawLoop);
	}
	function gameTicker() {
		Step();
		setTimeout(gameTicker, speed);
	}
	function drawLoop() {
		let ctx = canvas.getContext('2d');
		ctx.translate(0, canvas.height);
		ctx.scale(1, -1);
		ctx.transform(1, 0, 0.5, Math.sqrt(3) / 2, 0, 0);
		ctx.translate(10, 10);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, 10 * size, 10 * size);
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				FillAtPos(ctx, { x: i, y: j, side: Side.Left }, 'gray');
			}
		}
		for (const seg of segments) {
			FillAtPos(ctx, seg, 'red');
		}

		ctx.resetTransform();
		requestAnimationFrame(drawLoop);
	}
	function FillAtPos(
		ctx: CanvasRenderingContext2D,
		pos: pos,
		col: string | CanvasGradient | CanvasPattern
	) {
		const { x, y, side } = pos;
		ctx.fillStyle = col;
		ctx.beginPath();
		if (side == Side.Left) ctx.moveTo(x * size, y * size);
		else ctx.moveTo((x + 1) * size, (y + 1) * size);
		ctx.lineTo((x + 1) * size, y * size);
		ctx.lineTo(x * size, (y + 1) * size);
		if (side == Side.Left) ctx.moveTo(x * size, y * size);
		else ctx.moveTo((x + 1) * size, (y + 1) * size);
		ctx.fill();
	}
	function Turn(amount: number) {
		d = TurnDirByAmount(d, amount);
	}
	function Step() {
		segments.unshift(NextPosInDir(segments[0], d));
		segments.pop();
	}

	function TurnDirByAmount(dir: Dir, n: number) {
		return (((dir + n) % 6) + 6) % 6;
	}
	function NextPosInDir(pos: pos, dir: Dir): pos {
		if (dir == Dir.Right)
			return pos.side == Side.Left
				? { x: pos.x, y: pos.y, side: Side.Right }
				: { x: pos.x + 1, y: pos.y, side: Side.Left };
		if (dir == Dir.Left)
			return pos.side == Side.Left
				? { x: pos.x - 1, y: pos.y, side: Side.Right }
				: { x: pos.x, y: pos.y, side: Side.Left };
		if (dir == Dir.RightUp)
			return pos.side == Side.Left
				? { x: pos.x, y: pos.y, side: Side.Right }
				: { x: pos.x, y: pos.y + 1, side: Side.Left };
		if (dir == Dir.LeftDown)
			return pos.side == Side.Left
				? { x: pos.x, y: pos.y - 1, side: Side.Right }
				: { x: pos.x, y: pos.y, side: Side.Left };
		if (dir == Dir.LeftUp)
			return pos.side == Side.Left
				? { x: pos.x - 1, y: pos.y, side: Side.Right }
				: { x: pos.x, y: pos.y + 1, side: Side.Left };
		if (dir == Dir.RightDown)
			return pos.side == Side.Left
				? { x: pos.x, y: pos.y - 1, side: Side.Right }
				: { x: pos.x + 1, y: pos.y, side: Side.Left };
	}
</script>

<svelte:head>
	<title>Tri-Snek</title>
</svelte:head>
<svelte:window
	on:keydown={(e) => {
		console.log(e.key);

		switch (e.key.toLowerCase()) {
			case 'arrowleft':
				Turn(1);
				break;
			case 'arrowright':
				Turn(-1);
				break;
		}
	}}
/>
<canvas bind:this={canvas} width={750} height={500} />
<button on:click={start}>Start</button>
