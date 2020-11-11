export const srcPath: Framework.API.SrcPath = function (
  this: Framework.Bud,
  segment: string,
) {
  if (this.args.src) return this

  this.config.set('context', this.project(segment))

  return this
}
