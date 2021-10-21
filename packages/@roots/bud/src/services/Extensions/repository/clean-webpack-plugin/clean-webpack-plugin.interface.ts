import type {Extension as Contract} from '@roots/bud-framework'
import type {CleanWebpackPlugin} from '@roots/bud-support'
import type {Container} from '@roots/container'

export type {CleanWebpackPlugin}

export type {Container}

export type Extension = Contract.CompilerPlugin<
  CleanWebpackPlugin.Plugin,
  CleanWebpackPlugin.Options
>
