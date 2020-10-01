import Bud from '@roots/bud-types'
import checkEnvIsValid from './checkEnvIsValid'

const parseArguments = function (this: Bud): void {
  const [args, features, paths, webpack] = this.store.query([
    'args',
    'features',
    'paths',
    'webpack',
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
  args.has('dist') &&
    paths.set(
      'dist',
      this.fs.path.resolve(
        paths.get('project'),
        args.get('dist'),
      ),
    )

  /** Set env */
  if (args.has('env')) {
    checkEnvIsValid(args.get('env'))

    this.mode.set(args.get('env'))
  }

  args.has('devtool') && webpack.set('devtool', args.get('devtool'))
  args.has('target') && webpack.set('target', args.get('target'))

  /* eslint-disable */
  args.has('brotli') && features.set('brotli', args.get('brotli'))
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
}

export {parseArguments as default}
