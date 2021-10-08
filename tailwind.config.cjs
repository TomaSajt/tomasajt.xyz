module.exports = {
	mode: 'jit',
	content: ['./src/**/*.svelte'],
	darkMode: 'class', // or 'media' or 'class' or true
	theme: {
		fontFamily: {
			opensans: ['Open Sans', 'sans-serif']
		},
		extend: {}
	},
	variants: {
		extend: {},
		imageRendering: ['responsive']
	},
	plugins: [require('tailwindcss-image-rendering')()]
};
