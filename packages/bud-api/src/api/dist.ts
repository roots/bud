import type {Bud} from '@roots/bud-typings'

export const dist: Dist = function (path?) {
  return path
    ? this.fs.path.join(this.config.get('output.path'), path)
    : this.config.get('output.path')
}

export type Dist<T = Bud> = (this: T, path?: string) => string
