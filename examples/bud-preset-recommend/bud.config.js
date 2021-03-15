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
    template: 'public/index.html',
    replace: {
      APP_TITLE: 'Bud Preset Demo',
    },
  })
  .entry({
    app: ['styles/app.css', 'scripts/app.js'],
  })
  .copy({'svg/': 'src/images/*.svg'})
  .hash(false)
  .run()
