/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#0f0f0f',

				'primary-content': '#c9c9c9',

				secondary: '#181818',

				'secondary-content': '#c9c9c9',

				accent: '#8957e5',

				'accent-content': '#0f0f0f',

				neutral: '#3b3b3b',

				info: '#67e8f9',

				success: '#307530',

				warning: '#fde047',

				error: '#b82323',

				tertiary: '#242424',

				'tertiary-content': '#c9c9c9',

				quaternary: '#4a4a4a',

				'quaternary-content': '#c9c9c9',

				quinary: '',

				'quinary-content': '#c9c9c9',
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
					primary: '#0f0f0f',

					'primary-content': '#c9c9c9',

					secondary: '#181818',

					'secondary-content': '#c9c9c9',

					accent: '#8957e5',

					'accent-content': '#0f0f0f',

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
