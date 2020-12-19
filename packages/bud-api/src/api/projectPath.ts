import {Bud} from '@roots/bud-typings'

export const projectPath: ProjectPath = function (dir) {
  this.disk.get('project').setBase(dir)
  this.fs.setBase(dir)

  return this
}

export type ProjectPath<T = Bud> = (this: T, dir: string) => T
