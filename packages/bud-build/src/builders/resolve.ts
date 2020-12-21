import {Framework, Webpack} from '@roots/bud-typings'

type Resolve = Webpack.Configuration['resolve']

export const resolve: (
  this: Framework,
) => {resolve: Resolve} = function () {
  return {
    resolve: {
      alias: this.hooks.filter<Resolve['alias']>(
        'webpack.resolve.alias',
        this.config.get('resolve.alias'),
      ),
      extensions: this.hooks.filter<Resolve['extensions']>(
        'webpack.resolve.extensions',
        this.config.get('resolve.extensions'),
      ),
      modules: this.hooks.filter<Resolve['modules']>(
        'webpack.resolve.modules',
        [this.config.get('context'), 'node_modules'],
      ),
    },
  }
}
