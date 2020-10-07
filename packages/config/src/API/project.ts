export const project: API.Project = function (path) {
  return path
    ? this.fs.path.join(this.store['paths'].get('project'), path)
    : this.store['paths'].project
}
