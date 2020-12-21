import {Module} from '@roots/bud-typings'
import * as Entrypoints from '@roots/entrypoints-webpack-plugin'

export * as api from './entrypoints'

export const make: Module.Make<
  Entrypoints.Plugin,
  Options
> = opts => new Entrypoints.Plugin(opts.all() as Options)

export const options: Options = {
  name: 'entrypoints.json',
  writeToFileEmit: true,
}

export interface Options {
  name: string
  writeToFileEmit: boolean
}
