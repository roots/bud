export const src: API.Src = function (path?) {
  return path
    ? this.fs.path.resolve(this.store['build']['context'], path)
    : this.store['build']['context']
}
