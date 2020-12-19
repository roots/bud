import {bud, Bud} from '@roots/bud'

bud.src('resources/assets')
bud.publicPath('/app/themes/sage')

bud.use([
  '@roots/bud-babel',
  '@roots/bud-imagemin',
  '@roots/bud-postcss',
  '@roots/bud-react',
  '@roots/bud-sass',
])

bud.when(
  bud.mode.is('production'),

  // production
  (bud: Bud) => {
    bud.use([
      '@roots/bud-wordpress-manifests',
      '@roots/bud-purgecss',
    ])
    bud.vendor()
    bud.runtime()
    bud.hash()
    bud.minify()
    bud.purge(bud.presets.get('purgecss.wp'))
  },

  // development
  (bud: Bud) => {
    bud.use(['@roots/bud-entrypoints'])
    bud.proxy()
  },
)

export {bud}
