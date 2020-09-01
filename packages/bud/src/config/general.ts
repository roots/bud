import type {Bud} from '@roots/bud-typings'
const general = (bud: Bud) => ({
  context: bud.hooks.filter(
    'webpack.context',
    bud.paths.get('project'),
  ),
  devtool: bud.hooks.filter(
    'webpack.devtool',
    bud.options.get('webpack.devtool') ?? false,
  ),
  mode: bud.hooks.filter('webpack.mode', bud.mode),
  node: bud.hooks.filter(
    'webpack.node',
    bud.options.get('webpack.node'),
  ),
  stats: bud.hooks.filter(
    'webpack.stats',
    bud.options.get('webpack.stats'),
  ),
  target: bud.hooks.filter(
    'webpack.target',
    bud.options.get('webpack.target'),
  ),
  watch: bud.hooks.filter(
    'webpack.watch',
    bud.features.enabled('watch'),
  ),
})

export {general}
