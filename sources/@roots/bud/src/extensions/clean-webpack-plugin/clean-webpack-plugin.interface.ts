import type {Extension as Contract} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import type {CleanWebpackPlugin, Options} from 'clean-webpack-plugin'

export type {CleanWebpackPlugin}
export type {Container}
export type {Options}

export type Extension = Contract.Module<Options, CleanWebpackPlugin>
