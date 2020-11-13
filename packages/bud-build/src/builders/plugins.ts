import {Bud, Build, Extension} from '@roots/bud-typings'
import {Configuration, Plugin} from 'webpack'

export const plugins: Build.Plugins = function (
  this: Bud,
): {plugins: Configuration['plugins']} {
  const plugins: Configuration['plugins'] = this.extensions
    .store()
    .values()
    .map(
      (ext: Extension.Controller): Plugin =>
        ext.makePlugin ? ext.makePlugin() : null,
    )
    .filter(ext => ext)

  return {
    plugins,
  }
}
