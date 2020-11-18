import {Bud, Build, Webpack} from '@roots/bud-typings'

type Resolve = Webpack.Configuration['resolve']

type Build = (this: Bud.Contract) => {resolve: Resolve}

export const resolve: Build = function() {
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
        [
          this.src(),
          this.disk.get('project').base,
          this.disk.get('@roots').base,
        ],
      ),
    },
  }
}
