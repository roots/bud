// @ts-check
const {
  app,
} = require('../../packages/@roots/bud-preset-recommend')

app
  .when(
    app.isDevelopment,
    ({use}) => use([require('@roots/bud-react')]),
    ({use}) =>
      use(require('@roots/bud-esbuild'))
        .esbuild.jsx()
        .hash()
        .minify(),
  )
  .use([require('@roots/bud-emotion')])
  .html({
    template: 'public/index.html',
  })
  .entry({app: 'app.{js,css}'})
  .run()
