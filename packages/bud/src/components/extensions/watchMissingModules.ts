import {Extension} from '@roots/bud-typings'
import {WatchMissingNodeModulesPlugin as Plugin} from '@roots/bud-support'

export const options: Extension.RawOptions<PluginOptions> = bud => ({
  watchDir: bud.project('node_modules'),
})

export const make: Extension.Make<Plugin, PluginOptions> = opt =>
  new Plugin(opt.get('watchDir'))

export type PluginOptions = {
  watchDir: string
}
