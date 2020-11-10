export const dist: Framework.API.Dist = function (
  this: Framework.Bud,
  path?: string,
) {
  return path
    ? this.fs.path.resolve(
        this.config.get('output.path'),
        path as string,
      )
    : this.config.get('output.path')
}
