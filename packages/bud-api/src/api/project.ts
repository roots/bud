export const project: Framework.API.Project = function (
  segment,
) {
  return segment
    ? this.disk.get('project')
      ? this.disk.current.get(segment)
      : this.fs.path.join(process.cwd(), segment)
    : this.disk.get('project').getBase() ?? process.cwd()
}
