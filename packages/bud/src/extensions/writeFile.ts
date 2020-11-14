import WriteFilePlugin from 'write-file-webpack-plugin'
import type {Extension} from '@roots/bud-typings'

export const make: Extension.Make<WriteFilePlugin> = new WriteFilePlugin()
