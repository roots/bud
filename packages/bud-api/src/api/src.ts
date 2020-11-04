export const src: Framework.API.Src = function (path?) {
  return path
    ? this.fs.path.resolve(this.build.config['context'], path)
    : this.build.config['context']
}
