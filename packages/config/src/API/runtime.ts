export const runtime: API.Runtime = function (name) {
  this.store['features'].set('runtimeChunk', true)

  name &&
    this.store['build'].set(
      'optimization.runtimeChunk.name',
      name ?? this.store['build'].optimization.runtimeChunk.name,
    )

  return this
}
