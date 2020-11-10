export const src: Framework.API.Src = function (path?) {
  return path
    ? this.fs.path.resolve(this.config['context'], path)
    : this.config['context']
}
