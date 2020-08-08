const react = {
  extends: ['plugin:react/recommended'],
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 1,
  },
}

export = {react}
