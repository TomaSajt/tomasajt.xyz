import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnpluginIcons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders"

const config: UserConfig = {
	plugins: [
		sveltekit(),
		UnpluginIcons({
			compiler: "svelte",
			customCollections: {
				"custom": FileSystemIconLoader("./static/icons")
			}
		})
	]
};

export default config;
