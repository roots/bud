import type {Bud} from './types'

const externals = (bud: Bud) => ({
  bud,

  make: function () {
    this.final = this.bud.options.has('externals')
      ? this.bud.hooks.filter('webpack_externals', this.bud.options.get('externals'))
      : this.bud.hooks.filter('webpack_externals_fallback', false)

    /**
     * Don't include modules when target is node.
     */
    return this.bud.options.is('target', 'node')
      ? [...this.bud.services.nodeExternals(), ...this.final]
      : this.final ?? null
  },
})

export {externals}
