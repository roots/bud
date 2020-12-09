import {Bud} from '@roots/bud-typings'
import {normalize} from 'path'

export const publicPath: PublicPath = function (publicPath) {
  this.config.set(
    'output.publicPath',
    normalize(`/${publicPath}/`),
  )

  return this
}

export type PublicPath<T = Bud> = (
  this: T,
  publicPath: string,
) => T
