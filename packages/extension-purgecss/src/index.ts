import Plugin from '@fullhuman/postcss-purgecss'
import * as wp from 'purgecss-with-wordpress'
import type {Framework, Module} from '@roots/bud-typings'
import type {Purge} from './interfaces'

export const boot: Module.Boot = bud => {
  bud.store.set('presets.purgecss', {wp})
}

const purge: Purge.Config = function configuration(
  this: Framework,
  userOptions: Purge.UserOptions,
): Framework {
  this.build.items.mutate(
    'postcss.options.postcssOptions.plugins',
    plugins => [...plugins, Plugin(userOptions)],
  )

  return this
}

export const api: Module.Api = () => ({
  purge,
})
