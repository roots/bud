/**
 * Set babel transformOptions
 */
export const setConfig: Babel.Config = function (
  opts: babel.TransformOptions,
) {
  this.bud.build.items.set('babel.options', opts)

  return this
}
