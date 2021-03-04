// @ts-check
const {
  bud,
} = require('./../../packages/@roots/bud-preset-recommend')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  bud.project('./../../node_modules'),
])

bud
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
