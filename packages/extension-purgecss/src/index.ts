import Plugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'
import type {Framework, Module} from '@roots/bud-typings'
import type {Purge} from './typings'

export const boot: Module.Boot = bud => {
  bud.presets.set('purgecss', {wp})
}

export const api: Module.Api = () => ({
  purge: function configuration(
    this: Framework,
    userOptions: Purge.UserOptions,
  ): Framework {
    this.build.items.mutate(
      'postcss.options.postcssOptions.plugins',
      plugins => [...plugins, Plugin(userOptions)],
    )

    return this
  },
})
