/**
 * Webpack plugins.
 */
const plugins = (bud: Bud) => ({
  bud,

  pluginQueue: bud.plugin.webpackAdapters,

  make: function () {
    this.doHook('pre')

    this.plugins = this.pluginQueue
      .map((plugin: RegisteredPlugin) =>
        this.bud.plugin.controller(this.bud).initController(plugin).buildPlugin(),
      )
      .filter(plugin => plugin !== undefined)

    this.doHook('post')

    return {
      plugins: this.plugins,
    }
  },

  doHook: function (name) {
    this.bud.hooks.call(
      `${name}_webpack_plugins`,
      this.plugins,
      this.bud,
    )
  },
})

export {plugins}

import type {Bud} from '../bud'
import type {RegisteredPlugin} from '../bud/plugin'