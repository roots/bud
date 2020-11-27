import {Extension} from '@roots/bud-typings'
import * as Entrypoints from '@roots/entrypoints-webpack-plugin'

export * as api from './entrypoints'

export const make: Extension.Make = opts =>
  new Entrypoints.Plugin(opts.getStore())

export const options: Extension.RawOptions<{
  name: string
  writeToFileEmit: boolean
}> = {
  name: 'entrypoints.json',
  writeToFileEmit: true,
}
