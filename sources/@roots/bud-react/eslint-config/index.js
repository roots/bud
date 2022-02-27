/**
 * React default eslint config
 *
 * @public
 */
module.exports = {
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: [require.resolve('@roots/bud-babel/eslint-config'), 'plugin:react/recommended'],
  plugins: ['react-hooks', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
