import type {Bud} from './types'

const externals = (bud: Bud) => ({
  bud,

  target: {
    externals: false,
  },

  make: function () {
    this.target.externals = this.bud.options.has('externals')
      ? this.bud.hooks.filter('webpack_externals', this.bud.options.get('externals'))
      : this.bud.hooks.filter('webpack_externals_fallback', false)

    /**
     * Don't include modules when target is node.
     */
    return ! this.bud.options.is('target', 'node')
      ? this.target.externals ?? null
      : [
        ...this.bud.services.nodeExternals(),
        ...this.target.externals,
      ]
  },
})

export {externals}
