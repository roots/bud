/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = (app) => {
  app
    .use('@roots/sage')
    .setPath({
      storage: '.budfiles',
      dist: 'dist',
    })
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
      customizer: '**/customizer.{js,css}',
    })
    .assets(['resources/images'])
    .watch(['tailwind.config.js', 'resources/views/*.blade.php']);

  app.entry({app: 'scripts/app.js'});
  console.log(app.hooks.filter('build/entry'));
  app.log();
};
