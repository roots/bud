import {Api} from '@roots/bud-typings'

const runtimeManifest: Api.RuntimeManifest = function (args?) {
  this.features.set('runtimeChunk', true)
  args?.name &&
    this.options.set(
      'webpack.optimization.runtimeChunk.name',
      args.name,
    )

  return this
}

export {runtimeManifest}
