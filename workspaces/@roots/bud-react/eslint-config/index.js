/**
 * React default eslint config
 *
 * @public
 */
module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react-hooks', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
