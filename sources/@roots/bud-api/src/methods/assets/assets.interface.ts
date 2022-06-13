import type {Bud} from '@roots/bud-framework'
import type CopyPlugin from 'copy-webpack-plugin'

export interface facade {
  (
    ...request: Array<
      | string
      | CopyPlugin.ObjectPattern
      | Array<string | [string, string] | CopyPlugin.ObjectPattern>
    >
  ): Bud
}

export interface method {
  (
    ...request: Array<
      | string
      | CopyPlugin.ObjectPattern
      | Array<string | [string, string] | CopyPlugin.ObjectPattern>
    >
  ): Promise<Bud>
}
