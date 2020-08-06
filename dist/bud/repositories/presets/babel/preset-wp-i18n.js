/**
 * @roots/babel-preset-wp-i18n
 */
module.exports = ({
  makepot
}) => ({
  presets: [require('./preset-standard'), ...(makepot ? [[require('@wordpress/babel-plugin-makepot'), {
    output: makepot
  }]] : [])]
});