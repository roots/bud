import {Bud} from '@roots/bud-typings'

export const projectPath: ProjectPath = function (dir) {
  this.disk.get('project').setBase(dir)
  this.fs.setBase(dir)

  return this
}

type ProjectPath = (this: Bud, dir: string) => Bud
