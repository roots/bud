import type {Module} from '@roots/bud-typings'
import Plugin, {PluginOptions} from 'mini-css-extract-plugin'

export const make: Module.Make<Plugin, PluginOptions> = opt =>
  new Plugin(opt.all())

export const when: Module.When = ({mode}) =>
  mode.is('production')

export const options: Module.Options = ({features}) => {
  return {
    filename: features.enabled('hash')
      ? '[name].[hash].css'
      : '[name].css',
  }
}
