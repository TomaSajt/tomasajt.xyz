<script lang="ts">
import { tick } from "svelte";


	export let value = '';
	$: rows = value.split('\n').length;

	async function keyDownHandler(this: HTMLTextAreaElement, ev: KeyboardEvent) {
		if (ev.key == 'Tab') {
			ev.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;
			this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
			await tick();
			this.selectionStart = this.selectionEnd = start + 1;
		}
	}
</script>

<div class="flex font-consolas min-h-full h-[fit-content] bg-gray-300">
	<div class="w-[fit-content] min-w-[4em] text-right px-4 pt-5 leading-4 select-none">
		{#each Array(rows) as _, i}
			<div>{i}</div>
		{/each}
	</div>
	<div class="flex-grow min-h-full">
		<div id="outer" class="min-h-full">
			<textarea
				name="text"
				id="text"
				class="focus:outline-none"
				bind:value
				on:input={function () {
					this.parentNode.dataset.replicatedValue = this.value;
				}}
				on:keydown={keyDownHandler}
			/>
		</div>
	</div>
</div>

<style lang="postcss">
	#outer::after {
		content: attr(data-replicated-value) ' ';
		white-space: pre-wrap;
	}

	#outer {
		/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
		display: grid;
	}
	#outer::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	#outer > textarea {
		resize: none;
		overflow-y: hidden;
	}
	#outer > textarea,
	#outer::after {
		line-height: 1rem;
		grid-area: 1 / 1 / 2 / 2;
		margin-bottom: 200px;
		padding: 20px;
		background-color: inherit;
	}
</style>
