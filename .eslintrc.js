module.exports = {
	root: true,
	extends: 'eslint:recommended',
	env: {
		browser: true,
		es6: true
	},
	parserOptions: {
		sourceType: 'module'
	},
	rules: {
		'no-console': 'off',
		quotes: ['error', 'single']
	}
};
