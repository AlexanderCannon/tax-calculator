module.exports = {
	"extends": "airbnb-base",
	env: {
		node: true,
		jest: true,
	},
	rules: {
		'import/no-extraneous-dependencies': [2, {
			devDependencies: [
				'**/*.test.js',
				'test/**',
			],
			optionalDependencies: false,
			peerDependencies: false,
		}],
		'no-param-reassign': ['error', {
			'ignorePropertyModificationsFor': ['staticContext']
		}],
		'no-nested-ternary': 0,
		'import/no-named-as-default': 0,
	},
};
