export const parseArguments = function (
  this: Framework.Bud,
): void {
  const [args, features] = this.store.query(['args', 'features'])

  args.has('devtool') &&
    this.build.config.set('devtool', args.get('devtool'))
  args.has('target') && this.build.config.set('target', args.get('target'))
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
  features.set('vendor', args.get('vendor'))
  args.has('watch') && features.set('watch', args.get('watch'))
  features.enabled('hot') && this.store['server'].enable('hot')
}
