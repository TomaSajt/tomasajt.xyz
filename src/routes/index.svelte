<script lang="ts">
	import HomeBanner from '$lib/components/HomeBanner.svelte';
	const links: { text: string; href: string; wip?: boolean }[] = [
		{ href: '/file-editor', text: 'File Editor' },
		{ href: '/games/hanoi', text: 'Towers of Hanoi' },
		{ href: '/inverse-kinematics', text: 'Inverse Kinematics' },
		{ href: '/rickspeed', text: 'Rickspeed' },
		{ href: '/screen-recursion', text: 'Screen Recursion' },
		{ href: '/games/tri-snek', text: 'Tri-Snek', wip: true }
	];
</script>

<svelte:head>
	<title>Index | tomasajt.xyz</title>
</svelte:head>

<HomeBanner />
<ul class="m-8">
	{#each links as { text, href, wip }}
		<li class="mb-4">
			<a
				class="block w-[fit-content] px-4 py-2 text-white font-bold"
				class:bg-blue-500={!wip}
				class:bg-orange-500={wip}
				{href}>{text}{wip ? ' (WIP)' : ''}</a
			>
		</li>
	{/each}
</ul>

<style lang="postcss">
</style>
