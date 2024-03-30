/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#0f0f0f',
				'primary-content': '#c9c9c9',
				secondary: '#181818',
				'secondary-content': '#c9c9c9',
				tertiary: '#242424',
				'tertiary-content': '#c9c9c9',
				quaternary: '#4a4a4a',
				'quaternary-content': '#c9c9c9',
				accent: '#8957e5',
				'accent-content': '#0f0f0f',
				neutral: '#3b3b3b',
				info: '#67e8f9',
				success: '#307530',
				warning: '#fde047',
				error: '#F23F43',
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: 'colors.primary',
					'primary-content': 'colors.primary-content',
					secondary: 'colors.secondary',
					'secondary-content': 'colors.secondary-content',
					accent: 'colors.accent',
					'accent-content': 'colors.accent-content',
					neutral: 'colors.neutral',
					info: 'colors.info',
					success: 'colors.success',
					warning: 'colors.warning',
					error: 'colors.error',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
