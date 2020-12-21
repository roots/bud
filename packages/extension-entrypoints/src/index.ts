import {Module} from '@roots/bud-typings'
import * as Entrypoints from '@roots/entrypoints-webpack-plugin'

export * as api from './entrypoints'

export const make: Module.Make = opts =>
  new Entrypoints.Plugin(opts.getStore())

export const options: Module.RawOptions<{
  name: string
  writeToFileEmit: boolean
}> = {
  name: 'entrypoints.json',
  writeToFileEmit: true,
}
