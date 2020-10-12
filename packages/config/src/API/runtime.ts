export const runtime: API.Runtime = function (name) {
  this.store['features'].set('runtimeChunk', true)

  name &&
    this.build.config.set(
      'optimization.runtimeChunk.name',
      name ?? this.build.config.optimization.runtimeChunk.name,
    )

  return this
}
