import {WatchMissingNodeModulesPlugin} from '@roots/bud-support'

export const options: Adapter.options = ({project}) =>
  project('node_modules')

export const make: Adapter.make = (opts: string) =>
  new WatchMissingNodeModulesPlugin(opts)
