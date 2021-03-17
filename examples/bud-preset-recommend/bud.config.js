// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

app
  .publicPath('/')
  .alias({
    '@images': 'images',
    '@scripts': 'scripts',
    '@styles': 'styles',
  })
  .html({
    replace: {
      APP_TITLE: 'Bud Preset Demo',
    },
  })
  .entry({
    app: ['styles/app.css', 'scripts/app.js'],
  })
  .run()
