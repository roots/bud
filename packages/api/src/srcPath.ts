export const srcPath: Api.SrcPath = function (segment: string) {
  if (this.args.dist) return this

  this.build.config.set(
    'context',
    this.hooks.filter(
      'api.distPath',
      this.disk.get('project').get(segment),
    ),
  )

  return this
}
