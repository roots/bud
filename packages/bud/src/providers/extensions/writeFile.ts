import WriteFilePlugin from 'write-file-webpack-plugin'
import type {Module} from '@roots/bud-typings'

export const make: Module.Make<WriteFilePlugin> = () =>
  new WriteFilePlugin()
