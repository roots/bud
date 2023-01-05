import type {Bud} from '@roots/bud-framework'
import isFunction from '@roots/bud-support/lodash/isFunction'

export type Parameters = [
  | Record<string, RegExp | string | Array<string | RegExp>>
  | ((
      externals:
        | Record<string, RegExp | string | Array<string | RegExp>>
        | undefined,
    ) => Record<string, RegExp | string | Array<string | RegExp>>),
]

export interface externals {
  (...externals: Parameters): Promise<Bud>
}

export const externals: externals = async function (this: Bud, externals) {
  const current = this.hooks.filter(`build.externals`, {})
  return this.hooks.on(
    `build.externals`,
    isFunction(externals)
      ? externals(current)
      : {...current, ...externals},
  )
}
