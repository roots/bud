// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
app.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  app.project('./../../node_modules'),
])

app
  .publicPath('/')
  .alias({
    '@images': 'images',
    '@scripts': 'scripts',
    '@styles': 'styles',
  })
  .html({
    template: 'public/index.html',
    replacements: {
      APP_TITLE: 'Bud Preset Demo',
    },
  })
  .entry({
    app: ['styles/app.css', 'scripts/app.js'],
  })
  .copy({'svg/': 'src/images/*.svg'})
  .runtime()
  .minify()
  .hash()
  .run()
