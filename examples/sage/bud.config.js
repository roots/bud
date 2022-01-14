/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */

module.exports = async (app) => {
  app
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
      customizer: '**/customizer.js',
    })
    .alias({
      fonts: app.path('src', 'fonts'),
      images: app.path('src', 'scripts'),
      scripts: app.path('src', 'scripts'),
      styles: app.path('src', 'styles'),
    })
    .copy([app.path('src', 'images/**/*')])
    .watch(['tailwind.config.js', 'resources/views/*.blade.php'])
    .setPath('dist', 'public')
    .setPublicPath('/app/themes/sage/public/')
    .serve('http://example.test:3000')
    .proxy('http://example.test');
};
