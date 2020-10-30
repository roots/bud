export const srcPath: Framework.API.SrcPath = function (
  this: Framework.Bud,
  segment: string,
) {
  if (this.args.dist) return this

  this.build.config.set(
    'context',
    this.disk.get('project').get(segment),
  )

  return this
}
