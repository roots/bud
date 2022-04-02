/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */

module.exports = async app => {
  app
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
    })
    .copy('images')
    .watch(['resources/views/*.blade.php'])
    .serve('http://example.test:3000')
    .proxy('http://example.test')
}
