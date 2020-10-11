export const dist: API.Dist = function (path?: string) {
  return path
    ? this.fs.path.resolve(
        this.store['build'].get('output.path'),
        path,
      )
    : this.store['build'].get('output.path')
}
