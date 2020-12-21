import {Framework} from '@roots/bud-typings'

export const projectPath: ProjectPath = function (dir) {
  this.disk.get('project').setBase(dir)
  this.fs.setBase(dir)

  return this
}

export type ProjectPath = (
  this: Framework,
  dir: string,
) => Framework
