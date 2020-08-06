import type {Bud} from '../../util/types'
export type {Bud}

export type WebpackAdapter = () => any
export type CorePlugin = () => any
export type Extension = WebpackAdapter | CorePlugin | object
export type PluginRepoEntry = {name: string; extension: Extension}
export type PluginsRepo = PluginRepoEntry[]

export interface BudPlugin {
  /**
   * Set options
   */
  setOptions?: Function

  /**
   * Merge options
   */
  mergeOptions?: Function

  /**
   * Make plugin output.
   */
  make?: Function

  /**
   * Conditions that need to be met in order to engage plugin functionality.
   */
  when?: Function
}

export type Controller = {
  bud?: Bud
  plugin?: BudPlugin
  name?: string
  init?: (repository: any) => any
  build?: (any) => any
  final?: (any) => any
  bindPluginProps?: () => any
  ensurePluginProp?: (arg0: string, arg1: any) => any
  setPluginOptions?: () => any
  mergePluginOptions?: () => any
  makePlugin?: () => any
  doPluginHook?: (hook: string, ...args: any) => any
}
