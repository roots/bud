import type {Bud} from '@roots/bud-typings'

export const alias: alias = function (aliases) {
  this.config.merge('resolve.alias', aliases)

  return this
}

export type alias = (
  this: Bud.Contract,
  name: string,
  make: any,
) => Bud.Contract
