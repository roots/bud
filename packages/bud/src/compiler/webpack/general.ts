import type {Bud} from './types'

const general = (bud: Bud) => ({
  context: bud.hooks.filter('webpack.context', bud.paths.get('project')),
  devtool: bud.hooks.filter('webpack.devtool', bud.options.get('devtool') ?? false),
  mode: bud.hooks.filter('webpack.mode', bud.mode),
  node: bud.hooks.filter('webpack.node', bud.options.get('node')),
  stats: bud.hooks.filter('webpack.stats', bud.options.get('stats')),
  target: bud.hooks.filter('webpack.target', bud.options.get('target')),
  watch: bud.hooks.filter('webpack.watch', bud.features.enabled('watch')),
})

export {general}
