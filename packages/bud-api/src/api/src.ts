import type {Framework} from '@roots/bud-typings'

export const src: Src = function (segment?) {
  return segment
    ? this.fs.path.resolve(this.config.get('context'), segment)
    : this.config.get('context')
}

export type Src = (this: Framework, segment?: string) => string
