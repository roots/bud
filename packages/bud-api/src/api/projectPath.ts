export const projectPath: Framework.API.ProjectPath = function (
  dir,
) {
  this.disk.get('project').setBase(dir)
  this.fs.setBase(dir)

  return this
}
