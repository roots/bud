/**
 * React default eslint config
 *
 * @public
 */
module.exports = {
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: ['@roots/bud-babel', 'plugin:react/recommended'],
  plugins: ['react-hooks', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
