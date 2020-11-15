import {Bud, Build, Container, Webpack} from '@roots/bud-typings'

type Resolve = Webpack.Configuration['resolve']
type Build = (
  this: Bud.Contract,
  config: Container,
) => {resolve: Resolve}

export const resolve: Build = function (config) {
  return {
    resolve: {
      alias: this.hooks.filter<Resolve['alias']>(
        'webpack.resolve.alias',
        config.get('resolve.alias'),
      ),
      extensions: this.hooks.filter<Resolve['extensions']>(
        'webpack.resolve.extensions',
        config.get('resolve.extensions'),
      ),
      modules: this.hooks.filter<Resolve['modules']>(
        'webpack.resolve.modules',
        [this.src()],
      ),
    },
  }
}
