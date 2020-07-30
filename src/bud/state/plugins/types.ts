import type {Bud} from '../../util/types'
export type {Bud}

export type WebpackAdapter = () => any
export type CorePlugin = () => any
export type Plugin = WebpackAdapter|CorePlugin
export type PluginRepoEntry = [string, Plugin]
export type PluginsRepo = PluginRepoEntry[]

/**
 * ## bud.state.plugins
 */
export type Plugins = {
  /**
   * Plugins store
   */
  repository: {
    adapters: PluginsRepo,
    core: PluginsRepo,
  }

  /**
   * Plugin controller.
   */
  controller: (bud: Bud) => Controller

  indexOfAdapter: (this: Plugins, name: string) => number

  /**
   * Get the value of a plugin.
   */
  getAdapter: (this: Plugins, plugin: string) => any

  /**
   * Add a plugin
   */
  addAdapter: (this: Plugins, plugin: PluginRepoEntry) => void

  /**
   * Set a plugin
   */
  setAdapter: (this: Plugins, name: string, plugin: PluginRepoEntry) => void

  /**
   * Remove a plugin
   */
  deleteAdapter: (this: Plugins, name: string) => void

  /**
   * Check if a plugin exists
   */
  hasAdapter: (this: Plugins, plugin: string) => boolean
}

export interface BudPlugin {
  setOptions?: Function
  mergeOptions?: Function
  make?: Function
  when?: Function
}

export type Controller = {
  bud?: Bud
  plugin?: BudPlugin
  name?: string
  initController?: ([string, object]: PluginRepoEntry) => Controller
  initPlugin?: () => any
  buildPlugin?: () => any
  bindPluginProps?: () => any
  ensurePluginProp?: (arg0: string, arg1: any) => any
  setPluginOptions?: () => any
  mergePluginOptions?: () => any
  makePlugin?: () => any
  doPluginHook?: (hook: string, ...args: any) => any
}
