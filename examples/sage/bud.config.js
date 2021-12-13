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
    .copy(['resources/images'])
    .watch(['tailwind.config.js', 'resources/views/*.blade.php'])
    .setPath('dist', 'public')
    .serve('http://example.test:3000')
    .proxy('http://example.test');
};
