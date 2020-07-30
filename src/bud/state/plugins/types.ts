import type {Bud} from '../../util/types'
export type {Bud}

export type WebpackAdapter = () => any
export type CorePlugin = () => any
export type Plugin = WebpackAdapter | CorePlugin
export type PluginRepoEntry = [string, Plugin]
export type PluginsRepo = PluginRepoEntry[]

/**
 * ## bud.plugins
 *
 * Extend bud with webpack adapters and core plugins.
 */
export type Plugins = {
  /**
   * ## bud.plugins.repository
   *
   * Plugins store
   */
  repository: {
    /**
     * ## bud.plugins.repository.adapters
     *
     * Webpack plugin adapters
     */
    adapters: PluginsRepo

    /**
     * ## bud.plugins.repository.core
     *
     * Core Bud plugins
     */
    core: PluginsRepo
  }

  /**
   * ## bud.plugins.controller
   *
   * Plugin controller.
   */
  controller: (bud: Bud) => Controller

  /**
   * ## bud.plugins.indexOfPlugin
   *
   * Get index of a core plugin.
   */
  indexOfPlugin: (this: Plugins, name: string) => number

  /**
   * ## bud.plugins.getPlugin
   *
   * Get the value of a core plugin.
   */
  getPlugin: (this: Plugins, plugin: string) => any

  /**
   * ## bud.plugins.addPlugin
   *
   * Add a core plugin.
   */
  addPlugin: (this: Plugins, plugin: PluginRepoEntry) => void

  /**
   * ## bud.plugins.setPlugin
   *
   * Set a core plugin.
   */
  setPlugin: (
    this: Plugins,
    name: string,
    plugin: PluginRepoEntry,
  ) => void

  /**
   * ## bud.plugins.deletePlugin
   *
   * Remove a core plugin.
   */
  deletePlugin: (this: Plugins, name: string) => void

  /**
   * ## bud.plugins.hasPlugin
   *
   * Check if a core plugin exists.
   */
  hasPlugin: (this: Plugins, plugin: string) => boolean

  /**
   * ## bud.plugins.indexOfAdapter
   *
   * Get index of a webpack plugin adapter
   */
  indexOfAdapter: (this: Plugins, name: string) => number

  /**
   * ## bud.plugins.getAdapter
   *
   * Get the value of a webpack plugin adapter.
   */
  getAdapter: (this: Plugins, plugin: string) => any

  /**
   * ## bud.plugins.addAdapter
   *
   * Add a webpack plugin adapter
   */
  addAdapter: (this: Plugins, plugin: PluginRepoEntry) => void

  /**
   * ## bud.plugins.setAdapter
   *
   * Set a webpack plugin adapter
   */
  setAdapter: (
    this: Plugins,
    name: string,
    plugin: PluginRepoEntry,
  ) => void

  /**
   * ## bud.plugins.deleteAdapter
   *
   * Remove a webpack plugin adapter
   */
  deleteAdapter: (this: Plugins, name: string) => void

  /**
   * ## bud.plugins.hasAdapter
   *
   * Check if a webpack plugin adapter exists
   */
  hasAdapter: (this: Plugins, plugin: string) => boolean
}

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
