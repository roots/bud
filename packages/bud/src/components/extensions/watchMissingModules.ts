import {Extension} from '@roots/bud-typings'
import {WatchMissingNodeModulesPlugin as Plugin} from '@roots/bud-support'

export const options: RawOptions = bud => ({
  watchDir: bud.project('node_modules'),
})
export const make: Make = opt => new Plugin(opt.get('watchDir'))

declare type Make = Extension.Make<Plugin, Options>
declare type Options = Extension.Options<RawOptions>
declare type RawOptions = Extension.Options<{
  watchDir: string
}>
