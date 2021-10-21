const path = require('path')

module.exports = bud => {
  bud
    .use([
      require('@roots/bud-preset-wordpress'),
      require('@roots/bud-eslint'),
      require('@roots/bud-tailwindcss'),
    ])
    .setPath({
      project: path.resolve('web/app/themes/sage'),
      src: 'resources',
      dist: 'public',
    })
    .entry({
      app: '**/app.{js,css}',
      editor: '**/editor.{js,css}',
    })
    .when(bud.isDevelopment, () => {
      bud
        .dev({
          host: 'http://bedrock.test',
          port: 3000,
        })
        .proxy({
          target: 'http://bedrock.test',
        })
    })
}
