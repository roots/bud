import {Api} from '@roots/bud-typings'

export const storage: Api.Storage = function (path?) {
  if (path) {
    this.store.set('webpack.recordsPath', path)

    this.extensions.set(
      'webpack-config-dump-plugin.options.outputPath',
      path,
    )
  }

  this.store.set('features.buildCache', true)

  return this
}
