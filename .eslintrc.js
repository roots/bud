module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks'],
  globals: {
    wp: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    strict: 0,
    'no-console': 0,
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 1,
    'no-extra-semi': 0,
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
  },
}
