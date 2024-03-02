module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'node'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:node/recommended',
	],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
	},
	rules: {
		'node/no-unsupported-features/es-syntax': 'off',
		'node/no-missing-import' : 'off',
		'@typescript-eslint/no-explicit-any' : 'off',
	},
	ignorePatterns: ['dist', 'node_modules'],
};
