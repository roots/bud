import type {Bud, Plugin} from './types'

/**
 * Webpack plugins.
 */
const plugins = (bud: Bud) => ({
  bud,

  make: function () {
    this.doHook('adapters_init')
    this.doHook('adapters_build')
    this.doHook('adapters_yield')

    return {
      plugins: this.bud.plugins.repository.adapters,
    }
  },

  doHook: function (name) {
    this.bud.hooks.call(name, this.bud)
  },
})

export {plugins}
