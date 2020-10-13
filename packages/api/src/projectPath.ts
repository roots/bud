export const projectPath: Api.ProjectPath = function (dir) {
  this.disk.set('project', {
    baseDir: dir,
    glob: ['**/*'],
  })

  return this
}
