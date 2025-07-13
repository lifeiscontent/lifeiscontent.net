module.exports = {
  env: {
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['react', 'react-hooks', 'prettier', 'json', 'markdown'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    strict: 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
  },
  overrides: [
    {
      files: ['gatsby-config.js', 'gatsby-node.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['src/**/*'],
      env: {
        browser: true,
      },
      globals: {
        __PATH_PREFIX__: 'readonly',
        __BASE_PATH__: 'readonly',
        graphql: 'readonly',
      },
    },
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
  ],
  ignorePatterns: [
    // Logs
    'logs',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    // Runtime data
    'pids',
    '*.pid',
    '*.seed',
    '*.pid.lock',
    // Coverage
    'lib-cov',
    'coverage',
    '.nyc_output',
    // Build/temp files
    '.grunt',
    'bower_components',
    '.lock-wscript',
    'build/Release',
    // Dependencies
    'node_modules',
    'jspm_packages',
    // TypeScript
    'typings',
    // Caches
    '.npm',
    '.eslintcache',
    '.node_repl_history',
    '*.tgz',
    // Environment
    '.env*',
    // Gatsby
    '.cache',
    'public',
    // OS files
    '.DS_Store',
    // Yarn
    '.pnp',
    '.pnp.js',
    '.yarn-integrity',
  ],
};
