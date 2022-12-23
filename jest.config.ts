/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';

const config = {
	transform: {
		'^.+\\.(t|j)s?$': '@swc/jest',
	},
	testMatch: ['<rootDir>/src/test/**/*.test.ts'],
	modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
	// moduleNameMapper: {
	// 	XMLHttpRequest$: '<rootDir>/src/test/__mocks__/XMLHttpRequest.ts',
	// },
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
	},
	testEnvironment: 'jsdom',
} as Config;

export default config;
