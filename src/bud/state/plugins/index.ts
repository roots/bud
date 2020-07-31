import {controller} from './controller'
import {core} from './core'
import {adapters} from './adapters'
import type {Plugins, PluginRepoEntry} from './types'

/**
 * ## bud.state.Plugins
 */
const plugins: Plugins = {
  repository: {
    adapters,
    core,
  },

  controller,

  getPlugin: function (this: Plugins, name: string): any {
    return this.repository.adapters[name]
  },

  setPlugin: function (
    this: Plugins,
    name: string,
    plugin: PluginRepoEntry,
  ): void {
    this.repository.adapters[name] = plugin
  },

  deletePlugin: function (this: Plugins, name: string): void {
    this.hasPlugin(name) && delete this.repository.adapters[name]
  },

  hasPlugin: function (this: Plugins, name: string): boolean {
    return this.repository.adapters.hasOwnProperty(name)
  },

  getAdapter: function (this: Plugins, name: string): any {
    return this.repository.adapters[name]
  },

  setAdapter: function (
    this: Plugins,
    name: string,
    plugin: PluginRepoEntry,
  ): void {
    this.repository.adapters[name] = plugin
  },

  deleteAdapter: function (this: Plugins, name: string): void {
    this.hasAdapter(name) && delete this.repository.adapters[name]
  },

  hasAdapter: function (this: Plugins, name: string): boolean {
    return this.repository.adapters.hasOwnProperty(name)
  },
}

export {plugins}
