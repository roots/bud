import {BudInterface} from '../'
import checkEnvIsValid from './checkEnvIsValid'

const parseArguments = (bud: BudInterface): BudInterface => {
  /** Project dir */
  bud.args.has('project') &&
    bud.paths.set(
      'project',
      bud.fs.path.resolve(
        process.cwd(),
        bud.args.get('project'),
      ),
    )

  /** Src dir */
  bud.args.has('src') &&
    bud.paths.set(
      'src',
      bud.fs.path.resolve(
        bud.paths.get('project'),
        bud.args.get('src'),
      ),
    )

  /** Dist dir */
  bud.args.has('dist') &&
    bud.paths.set(
      'dist',
      bud.fs.path.resolve(
        bud.paths.get('project'),
        bud.args.get('dist'),
      ),
    )

  /** Set env */
  bud.args.has('env') &&
    checkEnvIsValid(bud.args.get('env')) &&
    bud.mode.set(bud.args.get('env'))

  /** Devtool */
  bud.args.get('devtool') &&
    bud.options.set('webpack.devtool', bud.args.get('devtool'))

  /** Target */
  bud.args.get('target') &&
    bud.options.set('webpack.target', bud.args.get('target'))

  /** HTML template */
  bud.args.get('template') &&
    bud.options.set(
      'plugin.html.template',
      bud.fs.path.resolve(bud.fs.base, bud.args.get('template')),
    )

  /**
   * Set features.
   */
  bud.args.has('brotli') &&
    bud.features.set('brotli', bud.args.get('brotli'))

  bud.args.has('ci') &&
    bud.features.set('ci', bud.args.get('ci'))

  bud.args.has('gzip') &&
    bud.features.set('gzip', bud.args.get('gzip'))

  bud.args.has('hash') &&
    bud.features.set('hash', bud.args.get('hash'))

  bud.args.has('hot') &&
    bud.features.set('hot', bud.args.get('hot'))

  bud.args.has('html') &&
    bud.features.set('html', bud.args.get('html'))

  bud.args.has('minify') &&
    bud.features.set('minify', bud.args.get('minify'))

  bud.args.has('runtime') &&
    bud.features.set('runtimeChunk', bud.args.get('runtime'))

  bud.args.has('split') &&
    bud.features.set('splitChunks', bud.args.get('split'))

  bud.args.has('vendor') &&
    bud.features.set('vendor', bud.args.get('vendor'))

  bud.args.has('watch') &&
    bud.features.set('watch', bud.args.get('watch'))

  return bud
}

export {parseArguments as default}
