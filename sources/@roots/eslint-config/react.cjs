/**
 * React default eslint config
 *
 * @public
 */
module.exports = {
  extends: ['./defaults.cjs', 'plugin:react/recommended'],
  plugins: ['import', 'react', 'react-hooks', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
