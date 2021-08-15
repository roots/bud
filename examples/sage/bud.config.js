module.exports = (app) => {
  app
    .use(require('@roots/sage'))
    /**
     * Application assets
     */
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
      customizer: '**/customizer.{js,css}',
    })
    .assets(['resources/images'])

    /**
     * These files will trigger a full page reload
     * when modified.
     */
    .watch(['tailwind.config.js', 'resources/views/*.blade.php']);
};
