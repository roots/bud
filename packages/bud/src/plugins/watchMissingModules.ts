import type {Extension} from '@roots/bud-extensions'
import {WatchMissingNodeModulesPlugin as Plugin} from '@roots/bud-support'

export const options: RawOptions = ({project}) => ({
  watchDir: project('node_modules'),
})

export const make: Make = (opt: PluginOptions) =>
  new Plugin(opt.get('watchDir'))

declare type Make = Extension.Make<Plugin, PluginOptions>

declare type RawOptions = Extension.RawOptions<{
  watchDir: string
}>

declare type PluginOptions = Extension.Options<RawOptions>
