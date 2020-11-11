export const dist: Framework.API.Dist = function (
  this: Framework.Bud,
  path?: string,
) {
  return path
    ? this.fs.path.join(this.config.get('output.path'), path)
    : this.config.get('output.path')
}
