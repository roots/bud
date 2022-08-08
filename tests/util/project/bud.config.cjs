/* eslint-disable @typescript-eslint/explicit-member-accessibility */
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
        import: '**/app.js',
      },
      styles: {
        import: ['index.html', '**/app.css', '**/app.js'],
      },
    })
    .template({template: 'src/index.html'})
    .devtool(false)
    .watch('src/index.html')
    .serve(3015)
}
