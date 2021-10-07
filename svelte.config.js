import preprocess from 'svelte-preprocess';
import adapterVercel from '@sveltejs/adapter-vercel';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapterVercel(),
		target: '#svelte'
	}
};

export default config;
