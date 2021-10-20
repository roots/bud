const path = require('path')

module.exports = bud => {
  bud
    /**
     * Build theme
     */
    .make('sage', sage => {
      sage
        .use([
          require('@roots/bud-preset-wordpress'),
          require('@roots/bud-tailwindcss'),
        ])
        .setPath('project', path.resolve('web/app/themes/sage'))
        .setPath('src', 'resources')
        .setPath('dist', 'public')
        .entry({
          app: '**/app.{js,css}',
          editor: '**/editor.{js,css}',
        })
    })

    /**
     * Build plugin
     */
    .make('plugin', plugin => {
      plugin
        .use([
          require('@roots/bud-preset-wordpress'),
          require('@roots/bud-tailwindcss'),
        ])
        .setPath(
          'project',
          path.resolve('web/app/plugins/example-plugin'),
        )
        .entry({
          app: '**/app.{js,css}',
          editor: '**/editor.{js,css}',
        })
    })
}
