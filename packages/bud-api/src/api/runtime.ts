export const runtime: Framework.API.Runtime = function (name) {
  this.features.set('runtimeChunk', true)

  name &&
    this.config.set(
      'optimization.runtimeChunk.name',
      name ?? this.config.get('optimization.runtimeChunk.name'),
    )

  return this
}
