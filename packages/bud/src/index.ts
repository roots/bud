import Bud, {BudInterface, Plugin} from './Bud'

/**
 * Instantiate Bud object.
 */
const bud: Bud = new Bud()

/**
 * Set projectPath from args.
 *
 * This is used by filesystem setup so we do it early.
 */
if (bud.args.has('project')) {
  bud.paths.set(
    'project',
    bud.fs.path.resolve(process.cwd(), bud.args.get('project')),
  )
}

/**
 * Set filesystem best we can
 */
bud.updateDisk()

/**
 * Set CI mode from args if available --
 *
 * Enabling CI flags for @roots/bud-cli that rawmode is not supported.
 */
if (bud.args.get('ci')) {
  bud.features.enable('ci')
}

/**
 * Set mode from args if available
 */
if (
  bud.args.get('env') == 'production' ||
  'development' ||
  'none'
) {
  bud.mode.set(bud.args.get('env'))
}

/**
 * Enable dev if mode is set
 */
bud.mode.is('development') && bud.features.enable('dev')

/**
 * Set hot from args
 */
if (bud.args.get('hot')) {
  bud.features.enable('hot')
}

/**
 * Set src from args
 */
if (bud.args.get('src')) {
  bud.paths.set(
    'src',
    bud.fs.path.resolve(
      bud.paths.get('project'),
      bud.args.get('src'),
    ),
  )
}

/**
 * Set dist from args
 */
if (bud.args.get('dist')) {
  bud.paths.set(
    'dist',
    bud.fs.path.resolve(
      bud.paths.get('project'),
      bud.args.get('dist'),
    ),
  )
}

/**
 * Set devtool from args
 */
if (bud.args.get('devtool')) {
  bud.options.set('webpack.devtool', bud.args.get('devtool'))
}

/**
 * Set gzip from args
 */
if (bud.args.get('gzip')) {
  bud.features.set('gzip', bud.args.get('gzip'))
}

/**
 * Set brotli from args
 */
if (bud.args.get('brotli')) {
  bud.features.set('brotli', bud.args.get('brotli'))
}

/**
 * Setup loaders
 */
bud.makeLoaders()

/**
 * Set babel config
 */
bud.fs.has('babel.config.js') &&
  bud.loaders.set(
    'babel.options',
    bud.fs.read('babel.config.js'),
  )

/**
 * Get postcss config
 */
bud.fs.has('postcss.config.js') &&
  bud.loaders.set(
    'postcss.options',
    bud.fs.read('postcss.config.js'),
  )

/**
 * Bud - Webpack build framework
 */
export {BudInterface, Plugin}

module.exports = bud
