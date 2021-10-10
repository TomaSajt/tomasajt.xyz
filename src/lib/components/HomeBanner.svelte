<script lang="ts">
	import FloatingLine from '$lib/components/FloatingLine.svelte';
</script>

<div class="bg-gray-800 h-96 text-white relative overflow-y-clip">
	<div class="px-10 py-2">
		<div class="font-bold text-2xl">Welcome to tomasajt.xyz</div>
		<div class="font-medium text-2xl tracking-wider">by TomaSajt</div>
	</div>

	<div class="absolute w-full bottom-0 p-4">
		<FloatingLine
			icons={[
				{
					src: '/assets/js.svg',
					alt: 'JavaScript',
					href: 'https://www.javascript.com/'
				},
				{
					src: '/assets/karesz.png',
					alt: 'Kareszhub',
					href: 'https://kareszhub.tomasajt.xyz/'
				},
				{
					src: '/assets/svelte.svg',
					alt: 'SvelteKit',
					href: 'https://kit.svelte.dev/'
				}
			]}
		/>
	</div>
</div>
