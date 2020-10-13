export const runtime: Api.Runtime = function (name) {
  this.features.set('runtimeChunk', true)

  name &&
    this.build.config.set(
      'optimization.runtimeChunk.name',
      name ??
        this.build.config.get('optimization.runtimeChunk.name'),
    )

  return this
}
