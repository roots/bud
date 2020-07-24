import type {Bud, RegisteredPlugin} from './types'

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
        this.bud.plugin
          .controller(this.bud)
          .initController(plugin)
          .buildPlugin()
      )
      .filter(plugin => plugin !== undefined)

    this.doHook('post')

    return {
      plugins: this.plugins,
    }
  },

  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_plugins`, this, params)
  },
})

export {plugins}