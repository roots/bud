// @ts-check
const {
  app,
} = require('../../packages/@roots/bud-preset-recommend')

app
  .use([
    require('@roots/bud-react'),
    require('@roots/bud-emotion'),
  ])
  .html({
    template: 'public/index.html',
    replace: {
      APP_TITLE: 'Test',
    },
  })
  .entry({app: 'app.{js,css}'})
  .run()
