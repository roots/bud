import Plugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'
import type {Bud, Extension} from '@roots/bud-typings'

export const boot: Extension.Boot = bud => {
  bud.presets.set('purgecss', {wp})
}

export const api: Extension.Contract['api'] = () => ({
  purge: function configuration(
    this: Bud,
    userOptions: Purge.UserOptions,
  ): Bud {
    this.build.items.mutate(
      'postcss.options.postcssOptions.plugins',
      plugins => [...plugins, Plugin(userOptions)],
    )

    return this
  },
})
