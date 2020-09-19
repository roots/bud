import Bud, {BudInterface, Plugin} from './Bud'

/**
 * Instantiate Bud object.
 */
const bud: Bud = new Bud()

/**
 * Loaders have to be set up after Bud is instantiated.
 */
bud.makeLoaders()

/**
 * Parse env arg
 */
if (bud.args.get('env')) {
  if (
    bud.args.get('env') !== 'production' &&
    bud.args.get('env') !== 'development' &&
    bud.args.get('env') !== 'none'
  ) {
    console.error(
      'Env must be one of: production, development, none',
    )
    bud.terminate()
  }

  bud.mode.set(bud.args.get('env'))
  bud.mode.is('development') && bud.features.enable('dev')
}

/**
 * Parse feature flags
 */
bud.features.set('ci', bud.args.get('ci'))
bud.features.set('hot', bud.args.get('hot'))
bud.features.set('watch', bud.args.get('watch'))
bud.features.set('gzip', bud.args.get('gzip'))
bud.features.set('brotli', bud.args.get('brotli'))

/**
 * Parse various options
 */
bud.args.get('devtool') &&
  bud.options.set('webpack.devtool', bud.args.get('devtool'))

bud.features.enabled('hot') &&
  bud.options.set('server.hot', true)

/**
 * Pathing args
 */
if (bud.args.has('project')) {
  bud.paths.set(
    'project',
    bud.fs.path.resolve(process.cwd(), bud.args.get('project')),
  )
}

bud.args.get('src') &&
  bud.paths.set(
    'src',
    bud.fs.path.resolve(
      bud.paths.get('project'),
      bud.args.get('src'),
    ),
  )

bud.args.get('dist') &&
  bud.paths.set(
    'dist',
    bud.fs.path.resolve(
      bud.paths.get('project'),
      bud.args.get('dist'),
    ),
  )

/** Refresh internal file index */
bud.updateDisk()

/** Set project info */
if (bud.fs.has('package.json')) {
  bud.package = bud.makeContainer(
    bud.fs.readJson('package.json'),
  )
  bud.name = bud.package.get('name')
}

/** Check/process babel config */
bud.fs.has('babel.config.js') &&
  bud.loaders.set(
    'babel.options',
    bud.fs.require('babel.config.js'),
  )

/** Check/process postcss config */
bud.fs.has('postcss.config.js') &&
  bud.loaders.set(
    'postcss.options',
    bud.fs.require('postcss.config.js'),
  )

/**
 * Bud - Webpack build framework
 */
module.exports = bud
export {BudInterface, Plugin}
