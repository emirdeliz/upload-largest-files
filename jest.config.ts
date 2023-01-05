/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';

const config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/test/**/*.test.ts'],
	modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
	// moduleNameMapper: {
	// 	XMLHttpRequest$: '<rootDir>/src/test/__mocks__/XMLHttpRequest.ts',
	// },
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				isolatedModules: true,
			},
		],
	},
} as Config;

export default config;
