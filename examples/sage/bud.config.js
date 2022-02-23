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
    .alias({
      '@fonts': app.path('src', 'fonts'),
      '@images': app.path('src', 'images'),
      '@scripts': app.path('src', 'scripts'),
      '@styles': app.path('src', 'styles'),
    })
    .copy('images')
    .watch(['resources/views/*.blade.php'])
    .serve('http://example.test:3000')
    .proxy('http://example.test')
}
