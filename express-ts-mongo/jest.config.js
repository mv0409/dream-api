module.exports = {
	testEnvironment: 'node',
	verbose: true,
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	coverageDirectory: 'coverage',
	collectCoverageFrom: [
		'src/**/*.{ts,tsx,js,jsx}',
		'!src/**/*.d.ts',
		'!__test__/fixtures/**/*.{ts,tsx,js,jsx}',
	],
};
