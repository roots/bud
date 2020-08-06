module.exports = {
  extends: [
    './index',
    'plugin:react/recommended',
  ],
  plugins: [
    'react-hooks',
  ],
  rules: {
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 1,
  },
}
