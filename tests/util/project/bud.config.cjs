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
      app: ['scripts/app', 'styles/app'],
    })

    .copy(['src/images/**/*'])
    .template({template: 'src/index.html', cache: true})
    .devtool(false)
    .watch('src/index.html')
    .serve(3015)
}
