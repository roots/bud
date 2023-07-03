import type {AsyncSeriesWaterfallHook, SyncWaterfallHook} from 'tapable'

import type {SettingsAndStyles} from './theme.js'

export interface CompilationHooks {
  dependencies: SyncWaterfallHook<[Array<string>]>
  options: AsyncSeriesWaterfallHook<SettingsAndStyles>
}

/**
 * Plugin options
 */
export interface Options extends SettingsAndStyles {
  /**
   * Warning comment about the file being generated.
   */
  __generated__?: string
  path: string
  version: 2
}

export {ThemeJsonWebpackPlugin as default} from './plugin.js'
export type * from './theme.js'
export type * as Schema from './theme.js'
