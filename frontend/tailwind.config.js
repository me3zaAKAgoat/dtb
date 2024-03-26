/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#000000',

				'primary-content': '#b4b4b4',

				secondary: '#111111',

				'secondary-content': '#b4b4b4',

				accent: '#4f46e5',

				'accent-content': '#000000',

				neutral: '#3b3b3b',

				info: '#67e8f9',

				success: '#307530',

				warning: '#fde047',

				error: '#b82323',

				tertiary: '#242424',

				'tertiary-content': '#b4b4b4',

				quaternary: '#363636',

				'quaternary-content': '#b4b4b4',
			},
			border: {
				radius: '4px',
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#000000',

					'primary-content': '#b4b4b4',

					secondary: '#111111',

					'secondary-content': '#b4b4b4',

					accent: '#4f46e5',

					'accent-content': '#000000',

					neutral: '#3b3b3b',

					info: '#67e8f9',

					success: '#307530',

					warning: '#fde047',

					error: '#b82323',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
