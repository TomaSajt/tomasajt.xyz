module.exports = {
	mode: 'jit',
	content: ['./src/**/*.svelte'],
	darkMode: 'class', // or 'media' or 'class' or true
	theme: {
		fontFamily: {
			ubuntu: ['Ubuntu', 'sans-serif']
		},
		extend: {
			animation: {
				'fly-in': 'slide 2s forwards ease-out'
			},
			keyframes: {
				slide: {
					'0%': { opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			}
		}
	},
	variants: {
		extend: {},
		imageRendering: ['responsive']
	},
	plugins: [require('tailwindcss-image-rendering')()]
};
