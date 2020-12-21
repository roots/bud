import {Framework} from '@roots/bud-typings'

export const project: Project = function (segment) {
  return segment
    ? this.fs.path.join(this.fs.getBase(), segment)
    : this.fs.getBase() ?? process.cwd()
}

export type Project = (this: Framework, path?: string) => string
