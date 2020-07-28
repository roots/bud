import type {Bud} from './types'
import nodeExternals from 'webpack-node-externals'

/**
 * Webpack externals
 */
const externals = (bud: Bud) => ({
  bud,
  options: {},
  make: function () {
    /**
     * Set externals from bud.state.
     */
    if (this.bud.state.options.externals) {
      this.options.externals = this.bud.state.options.externals
    }

    /**
     * When targeting node we don't want to incorporate
     * modules in the build.
     */
    if (this.bud.state.options.target == 'node') {
      this.options.externals = [nodeExternals()]
    }

    return this.options
  },
})

export {externals}
