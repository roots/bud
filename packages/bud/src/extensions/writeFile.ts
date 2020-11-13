import WriteFilePlugin from 'write-file-webpack-plugin'
import type {Extension} from '@roots/bud-extensions'

export const make: Extension.Make<WriteFilePlugin> = new WriteFilePlugin()
