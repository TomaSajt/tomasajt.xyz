<script context="module" lang="ts">
	export function load({ error, status }) {
		return {
			props: {
				error: error,
				status: status
			}
		};
	}
</script>

<script lang="ts">
	export let status: number;
	export let error: any;
</script>

<div class="absolute inset-0 m-auto w-[fit-content] max-w-screen-md h-[fit-content] bg-gray-300 p-8 rounded-lg">
	<h1 class="text-center text-5xl font-bold">{status}</h1>
	<h2 class="text-center text-2xl break-all">{error.message}</h2>
	<h2>{error.stack}</h2>
</div>
