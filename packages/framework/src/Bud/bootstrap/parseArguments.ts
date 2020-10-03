import Bud from '..'
import checkEnvIsValid from './checkEnvIsValid'

const parseArguments = function (this: Bud): void {
  const [
    args,
    babel,
    features,
    paths,
    webpack,
    pkg,
    postcss,
  ] = this.store.query([
    'args',
    'babel',
    'features',
    'paths',
    'webpack',
    'env',
    'package',
    'plugins',
    'postcss',
  ])

  /** Project dir */
  args.has('project') &&
    paths.set(
      'project',
      this.fs.path.resolve(process.cwd(), args.get('project')),
    )

  if (args.has('src')) {
    const src = this.fs.path.resolve(
      paths.get('project'),
      args.get('src'),
    )
    paths.set('src', src)
  }

  /** Dist dir */
  args.has('dist') && this.dist(args.get('dist'))

  pkg.repository = this.fs.exists('package.json')
    ? this.fs.readJson('package.json')
    : {}

  this.fs.exists('babel.config.js') &&
    babel.set('options', this.fs.require('babel.config.js'))

  this.fs.exists('postcss.config.js') &&
    postcss.set('options', this.fs.require('postcss.config.js'))

  /** Set env */
  if (args.has('env')) {
    checkEnvIsValid(args.get('env'))
    webpack.set('mode', args.get('env'))
  }

  /* eslint-disable */
  args.has('devtool') &&
    webpack.set('devtool', args.get('devtool'))
  args.has('target') && webpack.set('target', args.get('target'))
  args.has('brotli') &&
    features.set('brotli', args.get('brotli'))
  args.has('ci') && features.set('ci', args.get('ci'))
  args.has('gzip') && features.set('gzip', args.get('gzip'))
  args.has('hash') && features.set('hash', args.get('hash'))
  args.has('hot') && features.set('hot', args.get('hot'))
  args.has('html') && features.set('html', args.get('html'))
  args.has('minify') &&
    features.set('minify', args.get('minify'))
  args.has('runtime') &&
    features.set('runtimeChunk', args.get('runtime'))
  args.has('split') &&
    features.set('splitChunks', args.get('split'))
  args.has('vendor') &&
    features.set('vendor', args.get('vendor'))
  args.has('watch') && features.set('watch', args.get('watch'))
  /* eslint-enable */

  /**
   * side fx
   */
  webpack.set('output.publicPath', '/')
  webpack.set('mode', this.mode.get())
  features.enabled('hot') && this.store['server'].enable('hot')
}

export {parseArguments as default}
