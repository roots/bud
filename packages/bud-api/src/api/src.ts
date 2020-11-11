import {Bud} from '@roots/bud-typings'

export const src: Framework.API.Src = function (segment?) {
  return segment
    ? this.fs.path.resolve(this.config.get('context'), segment)
    : this.config.get('context')
}

export type Project = (
  this: Bud,
  segment?: string | undefined,
) => string | void
