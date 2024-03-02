/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#000000',

					'primary-content': '#b4b4b4',

					secondary: '#111111',

					'secondary-content': '#b4b4b4',

					accent: '#000',

					neutral: '#3b3b3b',

					info: '#67e8f9',

					success: '#00ff00',

					warning: '#fde047',

					error: '#ff0000',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
