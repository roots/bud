/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */

module.exports = (app) => {
  app
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
      customizer: '**/customizer.{js,css}',
    })
    .assets(['resources/images'])
    .watch(['tailwind.config.js', 'resources/views/*.blade.php']);
};
