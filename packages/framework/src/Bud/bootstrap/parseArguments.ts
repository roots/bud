import Bud from '..'
import checkEnvIsValid from './checkModeIsValid'

const parseArguments = function (this: Bud): void {
  const [args, features, build] = this.store.query([
    'args',
    'features',
    'build',
  ])

  /** Set env */
  if (args.has('mode')) {
    checkEnvIsValid(args.get('mode'))
    build.set('mode', args.get('mode'))
  } else {
    build.set('mode', 'none')
  }

  /* eslint-disable */
  args.has('devtool') && build.set('devtool', args.get('devtool'))
  args.has('target') && build.set('target', args.get('target'))
  args.has('brotli') && features.set('brotli', args.get('brotli'))
  args.has('ci') && features.set('ci', args.get('ci'))
  args.has('gzip') && features.set('gzip', args.get('gzip'))
  args.has('hash') && features.set('hash', args.get('hash'))
  args.has('hot') && features.set('hot', args.get('hot'))
  args.has('html') && features.set('html', args.get('html'))
  args.has('minify') && features.set('minify', args.get('minify'))
  args.has('runtime') && features.set('runtimeChunk', args.get('runtime'))
  args.has('split') && features.set('splitChunks', args.get('split'))
  args.has('vendor') && features.set('vendor', args.get('vendor'))
  args.has('watch') && features.set('watch', args.get('watch'))
  features.enabled('hot') && this.store['server'].enable('hot')
    /* eslint-enable */
}

export {parseArguments as default}
