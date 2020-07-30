import {controller} from './controller'
import {core} from './core'
import {adapters} from './adapters'
import type {
  Plugins,
  PluginRepoEntry
} from './types'

/**
 * ## bud.state.Plugins
 */
const plugins: Plugins = {
  repository: {
    adapters,
    core,
  },

  controller,

  indexOfAdapter: function (this: Plugins, name: string): number {
    return this.repository.adapters.indexOf(
      this.repository.adapters.filter(adapter => adapter[0] == name)[0]
    )
  },

  getAdapter: function (this: Plugins, name: string): any {
    return this.repository.adapters[name]
  },

  addAdapter: function (this: Plugins, adapter: PluginRepoEntry): void {
    this.repository.adapters.push(adapter);
  },

  setAdapter: function (this: Plugins, name: string, plugin: PluginRepoEntry): void {
    this.repository.adapters
      .filter(([adapterName]) => adapterName == name)
      .map(() => [name, plugin])
  },

  deleteAdapter: function (this: Plugins, name: string): void {
    this.repository.adapters
      .filter(([adapterName]) => adapterName == name)
      .forEach(function ([adapterName]) {
        delete(this.repository.adapters[this.indexOfAdapter(adapterName)])
      })
  },

  hasAdapter: function (this: Plugins, name: string): boolean {
    return this.repository.adapters
      .filter(([adapterName]) => adapterName == name)
      .length > 0
  },
}

export {plugins}
