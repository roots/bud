/**
 * PostCSS config.
 */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-normalize'),
    require('cssnano')({preset: ['default']}),
  ],
}
