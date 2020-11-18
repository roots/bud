import {Bud} from '@roots/bud-typings'

export const project: Project = function(segment) {
  return segment
    ? this.fs.path.join(this.fs.getBase(), segment)
    : this.fs.getBase() ?? process.cwd()
}

export type Project<T = Bud.Contract> = (
  this: T,
  path?: string,
) => string
