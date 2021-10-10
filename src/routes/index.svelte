<script lang="ts">
	import HomeBanner from '$lib/components/HomeBanner.svelte';
	const links: { text: string; href: string }[] = [
		{ href: '/hanoi', text: 'Towers of Hanoi' },
		{ href: '/screen-recursion', text: 'Screen Recursion' },
		{ href: '/file-editor', text: 'File Editor' }
	];
</script>

<svelte:head>
	<title>Index | tomasajt.xyz</title>
</svelte:head>

<HomeBanner />
<ul class="m-8">
	{#each links as { text, href }}
		<li class="mb-4">
			<a class="block w-[fit-content] px-4 py-2 bg-blue-500 text-white font-bold" {href}>{text}</a>
		</li>
	{/each}
</ul>

<style lang="postcss">
</style>
