import {Bud, Webpack} from '@roots/bud-typings'
import {Extension} from '@roots/bud-extensions'

export const plugins: Framework.Build.Plugins = function (
  this: Bud,
): {plugins: Webpack.Configuration['plugins']} {
  const plugins: Webpack.Configuration['plugins'] = this.extensions
    .store()
    .values()
    .map(
      (ext: Extension.Controller): Webpack.Plugin =>
        ext.makePlugin ? ext.makePlugin() : null,
    )
    .filter(ext => ext)

  return {
    plugins,
  }
}
