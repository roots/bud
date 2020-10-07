export const projectPath: API.ProjectPath = function (dir) {
  this.store.set('paths', 'project', this.fs.path.normalize(dir))

  return this
}
