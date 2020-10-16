import {Bud} from '@roots/bud-framework'
import {ingestConfig} from './helpers/ingestConfig'

/**
 * Instantiate Bud.
 */
const bud: Framework.Bud = new Bud()

/**
 * Use babel & postcss.
 */
bud.extensions.use('@roots/bud-babel').use('@roots/bud-postcss')

/**
 * Process feature flags.
 */
bud.args
  .entries()
  .filter(([k]) => !['src', 'dist', 'mode'].includes(k))
  .map(([arg, value]) => {
    bud.features.set(arg, value ? true : false)
  })

bud.args.has('target') && bud.target(bud.args.get('target'))

bud.mode.set(bud.args.get('mode') ?? 'none')

/**
 * Error out if specified build mode is invaid.
 */
bud.when(
  !bud.mode.is('production') &&
    !bud.mode.is('development') &&
    !bud.mode.is('none'),
  () => {
    console.error(
      'Mode must be one of: production, development, none.',
    )
    process.exit(1)
  },
)

/**
 * Set @roots org namespace disk
 */
bud.disk.set('@roots', {
  baseDir: bud.fs.path.resolve(__dirname, '../../'),
  glob: ['**/*'],
})

/**
 * Set project disk.
 */
bud.disk.set('project', {
  baseDir: process.cwd(),
  glob: ['**/*'],
})

bud.args.has('publicPath') &&
  bud.publicPath(bud.args.get('publicPath'))

bud.projectPath(
  bud.args.has('project')
    ? bud.fs.path.resolve(
        bud.disk.baseDir,
        bud.args.get('project'),
      )
    : process.cwd(),
)

bud.srcPath(bud.args.has('src') ? bud.args.get('src') : 'src')
bud.distPath(
  bud.args.has('dist') ? bud.args.get('dist') : 'dist',
)

bud.features.enabled('html') && bud.template()
bud.features.enabled('minify') && bud.minify()
bud.features.enabled('gzip') && bud.gzip()
bud.features.enabled('brotli') && bud.brotli()
bud.features.enabled('hash') && bud.hash()
bud.features.enabled('runtime') && bud.runtime()
bud.features.enabled('vendor') && bud.vendor()
bud.features.enabled('devtool') &&
  (() => {
    bud.devtool(
      bud.args.get('devtool') ?? '#@cheap-eval-source-map',
    )
  })

/**
 * Stow project files
 */
bud.fs.exists('package.json') &&
  ingestConfig(bud.store, 'pkg', bud.fs.readJson('package.json'))

bud.fs.exists('babel.config.js') &&
  ingestConfig(
    bud.store,
    'babel',
    bud.fs.require('babel.config.js'),
  )

bud.fs.exists('postcss.config.js') &&
  ingestConfig(
    bud.store,
    'postcss',
    bud.fs.require('postcss.config.js'),
  )

bud.fs.exists('.browserslist') &&
  ingestConfig(
    bud.store,
    'browserslist',
    bud.fs.require('.browserslist'),
  )

export default bud
module.exports = bud
