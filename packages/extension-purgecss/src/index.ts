import Plugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'
import type {Bud, Extension} from '@roots/bud-typings'
import type {Purge} from './typings'

export const boot: Extension.Module.Boot = bud => {
  bud.presets.set('purgecss', {wp})
}

export const api: Extension.Module.Api = () => ({
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
