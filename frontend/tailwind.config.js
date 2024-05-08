const colors = {
	primary: '#0f0f0f',
	'primary-content': '#e0e0e0',
	secondary: '#181818',
	'secondary-content': '#e0e0e0',
	tertiary: '#242424',
	'tertiary-content': '#e0e0e0',
	quaternary: '#4a4a4a',
	'quaternary-content': '#e0e0e0',
	accent: '#8957e5',
	'accent-content': '#0f0f0f',
	neutral: '#3b3b3b',
	info: '#67e8f9',
	success: '#23a55a',
	warning: '#fde047',
	error: '#F23F43',
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				...colors,
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					...colors,
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
