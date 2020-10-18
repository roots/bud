import {WatchMissingNodeModulesPlugin} from '@roots/bud-support'

export const options: Framework.Extension.Options = ({project}) =>
  project('node_modules')

export const make: Framework.Extension.Make = (opts: string) =>
  new WatchMissingNodeModulesPlugin(opts)
