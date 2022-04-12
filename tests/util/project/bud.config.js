/* eslint-disable tsdoc/syntax */
// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 * @param {Bud} app
 */
module.exports = async app => {
  app
    .entry({
      app: {
        import: '**/app.{js,css}',
      },
    })
    .copy(['src/images/**/*'])
    .template({template: 'src/index.html'})
    .devtool(false)
    .watch('src/index.html')
}
