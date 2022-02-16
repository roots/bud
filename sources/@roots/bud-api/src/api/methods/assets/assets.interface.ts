import type {Framework} from '@roots/bud-framework'
import CopyPlugin from 'copy-webpack-plugin'

export interface facade {
  (
    paths:
      | string
      | CopyPlugin.ObjectPattern
      | Array<string | CopyPlugin.ObjectPattern>,
  ): Framework
}

export interface method {
  (
    paths:
      | string
      | CopyPlugin.ObjectPattern
      | Array<string | CopyPlugin.ObjectPattern>,
  ): Promise<Framework>
}
