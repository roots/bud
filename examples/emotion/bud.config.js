// @ts-check

const babel = require('@roots/bud-babel')
const react = require('@roots/bud-react')
const emotion = require('@roots/bud-emotion')

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
function config(app) {
  app
    .use([babel, react, emotion])
    .template({
      template: 'public/index.html',
    })
    .entry('app', 'app.js')
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks().minimize()
    })
}

module.exports = config
