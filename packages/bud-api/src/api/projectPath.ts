export const projectPath: Framework.API.ProjectPath = function (
  dir,
) {
  this.disk.set('project', {
    baseDir: dir,
    glob: ['**/*'],
  })

  return this
}
