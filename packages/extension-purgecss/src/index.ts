import PurgeCssPlugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'
import type {Bud, Extension} from '@roots/bud-typings'

export const boot: Extension.Boot = bud => {
  bud.presets.set('purgecss', {wp})
}

export const api: Extension.Contract['api'] = () => ({
  purge: function configuration(
    this: Bud.Contract,
    userOptions: Purge.UserOptions,
  ): Bud.Contract {
    this.build.items.mutate(
      'postcss.options.postcssOptions.plugins',
      plugins => [...plugins, PurgeCssPlugin(userOptions)],
    )

    return this
  },
})
