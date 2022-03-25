import type {Framework} from '@roots/bud-framework'
import CopyPlugin from 'copy-webpack-plugin'

export interface facade {
  (
    ...request: Array<
      | string
      | CopyPlugin.ObjectPattern
      | Array<string | CopyPlugin.ObjectPattern>
    >
  ): Framework
}

export interface method {
  (
    ...request: Array<
      | string
      | CopyPlugin.ObjectPattern
      | Array<string | CopyPlugin.ObjectPattern>
    >
  ): Promise<Framework>
}
