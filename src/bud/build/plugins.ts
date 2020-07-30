import type {Bud, Plugin} from './types'

/**
 * Webpack plugins.
 */
const plugins = (bud: Bud) => ({
  bud,
  adapters: bud.plugins.repository.adapters,

  make: function () {
    this.doHook('adapters_init')
    this.doHook('adapters_build')
    this.doHook('adapters_final')

    return {
      plugins: this.adapters,
    }
  },

  doHook: function (name) {
    this.adapters = this.bud.hooks.filter(
      `filter_${name}`,
      this.adapters,
    )
    this.bud.hooks.call(name, this.adapters)
  },
})

export {plugins}
