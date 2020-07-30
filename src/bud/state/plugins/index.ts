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

  indexOfPlugin: function (this: Plugins, name: string): number {
    return this.repository.core.indexOf(
      this.repository.core.filter(plugin => plugin[0] == name)[0],
    )
  },

  getPlugin: function (this: Plugins, name: string): any {
    return this.repository.core[name]
  },

  addPlugin: function (this: Plugins, plugin: PluginRepoEntry): void {
    this.repository.core.push(plugin)
  },

  setPlugin: function (
    this: Plugins,
    name: string,
    plugin: PluginRepoEntry,
  ): void {
    this.repository.core
      .filter(([pluginName]) => pluginName == name)
      .map(() => [name, plugin])
  },

  deletePlugin: function (this: Plugins, name: string): void {
    this.repository.core
      .filter(([pluginName]) => pluginName == name)
      .forEach(function ([pluginName]) {
        delete this.repository.core[this.indexOfPlugin(pluginName)]
      })
  },

  hasPlugin: function (this: Plugins, name: string): boolean {
    return (
      this.repository.core.filter(
        ([pluginName]) => pluginName == name,
      ).length > 0
    )
  },

  indexOfAdapter: function (this: Plugins, name: string): number {
    return this.repository.adapters.indexOf(
      this.repository.adapters.filter(
        adapter => adapter[0] == name,
      )[0],
    )
  },

  getAdapter: function (this: Plugins, name: string): any {
    return this.repository.adapters[name]
  },

  addAdapter: function (
    this: Plugins,
    adapter: PluginRepoEntry,
  ): void {
    this.repository.adapters.push(adapter)
  },

  setAdapter: function (
    this: Plugins,
    name: string,
    plugin: PluginRepoEntry,
  ): void {
    this.repository.adapters
      .filter(([adapterName]) => adapterName == name)
      .map(() => [name, plugin])
  },

  deleteAdapter: function (this: Plugins, name: string): void {
    this.repository.adapters
      .filter(([adapterName]) => adapterName == name)
      .forEach(function ([adapterName]) {
        delete this
          .repository.adapters[this.indexOfAdapter(adapterName)]
      })
  },

  hasAdapter: function (this: Plugins, name: string): boolean {
    return (
      this.repository.adapters.filter(
        ([adapterName]) => adapterName == name,
      ).length > 0
    )
  },
}

export {plugins}
