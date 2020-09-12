/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')

bud.extend([
  require('@roots/bud-react'),
  require('@roots/bud-sass'),
  require('@roots/bud-eslint').plugin,
  require('@roots/bud-stylelint').plugin,
  require('@roots/bud-purgecss').plugin,
  require('@roots/bud-wordpress-manifests'),
])

bud
  .distPath('dist')
  .srcPath('resources/assets')
  .publicPath('app/themes/sage/dist')

bud
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.scss'),
  ])
  .bundle('editor', [
    bud.src('scripts/editor.js'),
    bud.src('styles/editor.scss'),
  ])
  .bundle('customizer', [bud.src('scripts/customizer.js')])

bud
  .provide({jquery: ['$', 'jQuery']})
  .vendor()
  .runtimeManifest()

bud.mode.is('development') &&
  bud
    .dev({
      from: {
        host: bud.env.get('APP_HOST'),
      },
    })
    .devtool('inline-cheap-module-source-map')

bud.mode.is('production') &&
  bud
    .hash()
    .mini()
    .gzip()
    .devtool('hidden-source-map')
    .purgecss(require('@roots/bud-purgecss').preset)

bud.compile()
