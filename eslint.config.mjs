import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierExtends from 'eslint-config-prettier';

import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
	globalIgnores(['.next', '.vercel', 'design/**', 'public/**']),
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@typescript-eslint': typescriptEslint,
			react,
			'react-hooks': reactHooks,
			perfectionist
		},
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: 'tsconfig.json',
				tsconfigRootDir: __dirname
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			...js.configs.recommended.rules,
			...prettierExtends.rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...typescriptEslint.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'perfectionist/sort-objects': [
				'error',
				{
					type: 'natural',
					order: 'asc'
				}
			],
			'perfectionist/sort-jsx-props': 'error',
			'perfectionist/sort-interfaces': 'error',
			'perfectionist/sort-object-types': 'error',
			'perfectionist/sort-imports': [
				'error',
				{
					type: 'natural',
					order: 'asc',
					newlinesBetween: 'always',
					groups: ['builtin', 'react', 'reactEcoystem', 'external', 'internal'],
					customGroups: [
						...Object.entries({
							react: ['^react$'],
							reactEcoystem: ['^react-.+']
						})
							.map(([groupName, elementNamePattern]) => [
								{
									selector: 'type',
									groupName,
									elementNamePattern
								},
								{
									groupName,
									elementNamePattern
								}
							])
							.reduce((result, item) => [...result, ...item])
					]
				}
			],
			'perfectionist/sort-named-imports': [
				'error',
				{
					type: 'natural',
					order: 'asc'
				}
			],
			'perfectionist/sort-union-types': [
				'error',
				{
					type: 'natural',
					order: 'asc'
				}
			]
		}
	}
]);
