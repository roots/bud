import type {Bud} from '@roots/bud-framework'

export interface externals {
  (
    externals:
      | Record<string, RegExp | string | Array<string | RegExp>>
      | ((
          externals: Record<
            string,
            RegExp | string | Array<string | RegExp>
          >,
        ) => Record<string, RegExp | string | Array<string | RegExp>>),
  ): Bud
}

export const externals: externals = function (externals) {
  const bud = this as Bud
  const records = bud.hooks.filter(`build.externals`, {})
  const value =
    typeof externals === `function`
      ? externals(records)
      : {...records, ...externals}

  bud.hooks.on(`build.externals`, value)

  return bud
}
