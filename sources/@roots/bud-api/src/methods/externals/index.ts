import type {Bud} from '@roots/bud-framework'

import isFunction from '@roots/bud-support/lodash/isFunction'

export type Parameters = [
  | ((
      externals:
        | Record<string, Array<RegExp | string> | RegExp | string>
        | undefined,
    ) => Record<string, Array<RegExp | string> | RegExp | string>)
  | Record<string, Array<RegExp | string> | RegExp | string>,
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
