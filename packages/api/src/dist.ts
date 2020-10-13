export const dist: Api.Dist = function (path?: string) {
  return path
    ? this.fs.path.resolve(
        this.build.config.get('output.path'),
        path,
      )
    : this.build.config.get('output.path')
}
