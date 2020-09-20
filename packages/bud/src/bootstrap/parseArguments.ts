import {BudInterface} from '../'
import checkEnvIsValid from './checkEnvIsValid'

const parseArguments = (bud: BudInterface): BudInterface => {
  /**
   * Project dir.
   */
  bud.args.has('project') &&
    bud.paths.set(
      'project',
      bud.fs.path.resolve(
        process.cwd(),
        bud.args.get('project'),
      ),
    )

  /**
   * Src dir.
   */
  bud.args.get('src') &&
    bud.paths.set(
      'src',
      bud.fs.path.resolve(
        bud.paths.get('project'),
        bud.args.get('src'),
      ),
    )

  /**
   * Dist dir.
   */
  bud.args.get('dist') &&
    bud.paths.set(
      'dist',
      bud.fs.path.resolve(
        bud.paths.get('project'),
        bud.args.get('dist'),
      ),
    )

  /**
   * Set mode.
   */
  bud.args.get('env') &&
    checkEnvIsValid(bud.args.get('env')) &&
    bud.mode.set(bud.args.get('env'))

  bud.args.get('devtool') &&
    bud.options.set('webpack.devtool', bud.args.get('devtool'))

  /**
   * Set features.
   */
  bud.features.set('brotli', bud.args.get('brotli'))
  bud.features.set('ci', bud.args.get('ci'))
  bud.features.set('gzip', bud.args.get('gzip'))
  bud.features.set('hash', bud.args.get('hash'))
  bud.features.set('hot', bud.args.get('hot'))
  bud.features.set('minify', bud.args.get('minify'))
  bud.features.set('runtimeChunk', bud.args.get('runtime'))
  bud.features.set('splitChunks', bud.args.get('split'))
  bud.features.set('watch', bud.args.get('watch'))

  return bud
}

export {parseArguments as default}
