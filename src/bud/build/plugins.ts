import type {Bud, RegisteredPlugin} from './types'

/**
 * Webpack plugins.
 */
const plugins = (bud: Bud) => ({
  bud,

  controller: bud.plugin.controller,
  adapters: bud.state.plugins.adapters,

  make: function () {
    this.doHook('pre')

    this.plugins = this.adapters
      .map((plugin: RegisteredPlugin) =>
        this.controller
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
