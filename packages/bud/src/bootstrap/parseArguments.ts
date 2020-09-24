import {BudInterface} from '../'
import checkEnvIsValid from './checkEnvIsValid'

const parseArguments = function (this: BudInterface): void {
  /** Project dir */
  this.args.has('project') &&
    this.paths.set(
      'project',
      this.fs.path.resolve(
        process.cwd(),
        this.args.get('project'),
      ),
    )

  /** Src dir */
  this.args.has('src') &&
    this.paths.set(
      'src',
      this.fs.path.resolve(
        this.paths.get('project'),
        this.args.get('src'),
      ),
    )

  /** Dist dir */
  this.args.has('dist') &&
    this.paths.set(
      'dist',
      this.fs.path.resolve(
        this.paths.get('project'),
        this.args.get('dist'),
      ),
    )

  /** Set env */
  this.args.has('env') &&
    checkEnvIsValid(this.args.get('env')) &&
    this.mode.set(this.args.get('env'))

  /** Devtool */
  this.args.get('devtool') &&
    this.options.set('webpack.devtool', this.args.get('devtool'))

  /** Target */
  this.args.get('target') &&
    this.options.set('webpack.target', this.args.get('target'))

  /** HTML template */
  this.args.get('template') &&
    this.options.set(
      'plugin.html.template',
      this.fs.path.resolve(
        this.fs.base,
        this.args.get('template'),
      ),
    )

  /**
   * Set features.
   */
  this.args.has('brotli') &&
    this.features.set('brotli', this.args.get('brotli'))

  this.args.has('ci') &&
    this.features.set('ci', this.args.get('ci'))

  this.args.has('gzip') &&
    this.features.set('gzip', this.args.get('gzip'))

  this.args.has('hash') &&
    this.features.set('hash', this.args.get('hash'))

  this.args.has('hot') &&
    this.features.set('hot', this.args.get('hot'))

  this.args.has('html') &&
    this.features.set('html', this.args.get('html'))

  this.args.has('minify') &&
    this.features.set('minify', this.args.get('minify'))

  this.args.has('runtime') &&
    this.features.set('runtimeChunk', this.args.get('runtime'))

  this.args.has('split') &&
    this.features.set('splitChunks', this.args.get('split'))

  this.args.has('vendor') &&
    this.features.set('vendor', this.args.get('vendor'))

  this.args.has('watch') &&
    this.features.set('watch', this.args.get('watch'))
}

export {parseArguments as default}
