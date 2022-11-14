import type {Bud} from '@roots/bud-framework'

export type Parameters = [
  | Record<string, RegExp | string | Array<string | RegExp>>
  | ((
      externals: Record<string, RegExp | string | Array<string | RegExp>>,
    ) => Record<string, RegExp | string | Array<string | RegExp>>),
]

export interface externals {
  (...externals: Parameters): Promise<Bud>
}

export const externals: externals = async function (this: Bud, externals) {
  const records = this.hooks.filter(`build.externals`, {})

  const value =
    typeof externals === `function`
      ? externals(records)
      : {...records, ...externals}

  this.hooks.on(`build.externals`, value)

  return this
}
