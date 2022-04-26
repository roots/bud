const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'simple-import-sort',
    'tsdoc',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['plugin:react/recommended'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': ERROR,
    'arrow-body-style': OFF,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'no-console': ERROR,
    'no-extra-semi': OFF,
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'react/prop-types': OFF,
    'react/react-in-jsx-scope': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARN,
    'simple-import-sort/imports': ERROR,
    'tsdoc/syntax': WARN,
  },
  overrides: [
    {
      files: ['examples/**/*.js'],
      rules: {
        'tsdoc/syntax': 'off',
      },
    },
  ],
}
