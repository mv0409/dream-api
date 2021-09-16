module.exports = {
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	env: {
		es6: true,
		node: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2017,
		// sourceType: 'script',
	},
};
