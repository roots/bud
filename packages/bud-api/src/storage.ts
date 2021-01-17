import {Api} from '@roots/bud-typings'

export const storage: Api.Storage = function (path?) {
  if (path) {
    this.options.set('storage', path)

    this.extensions.set(
      'webpack-config-dump-plugin.options.outputPath',
      path,
    )
  }

  this.options.enable('webpack.cache')

  return this
}
