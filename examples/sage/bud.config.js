module.exports = (app) => {
  app
    .use(require('@roots/sage'))
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
      customizer: '**/customizer.{js,css}',
    })
    .assets(['resources/images'])
    .watch(['tailwind.config.js', 'resources/views/*.blade.php']);
};
