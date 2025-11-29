// @ts-check
import eslintPluginAstro from 'eslint-plugin-astro'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

/** @typedef {import('@typescript-eslint/utils/ts-eslint').FlatConfig.Config} FlatConfig */

const __dirname = dirname(fileURLToPath(import.meta.url))
const parserOptions = {
  project: ['./tsconfig.eslint.json'],
  tsconfigRootDir: __dirname,
  extraFileExtensions: ['.astro'],
}

/**
 * @param {FlatConfig} config
 * @returns {FlatConfig}
 */
const mergeParserOptions = (config) => {
  const languageOptions = {
    ...(config.languageOptions ?? {}),
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      ...parserOptions,
    },
  }

  return {
    ...config,
    languageOptions,
  }
}

const typeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map(mergeParserOptions)
const astroFlatConfigs = /** @type {FlatConfig[]} */ (
  eslintPluginAstro.configs['flat/recommended'] || eslintPluginAstro.configs.recommended
)
const astroRecommendedConfigs = astroFlatConfigs.map(mergeParserOptions)

export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'public/'],
  },
  ...typeCheckedConfigs,
  ...astroRecommendedConfigs,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['scripts/**/*.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['src/env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
]
