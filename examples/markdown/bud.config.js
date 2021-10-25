// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} bud
 */
module.exports = bud => {
  bud
    .use([
      require('@roots/bud-preset-recommend'),
      require('@roots/bud-react'),
      require('@roots/bud-mdx'),
    ])
    .entry('app', 'app.js')
    .minimize()
    .splitChunks()
    .template()
}
