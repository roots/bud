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
    const externalsState = this.bud.state.options.get('externals')

    if (externalsState) {
      this.options.externals = externalsState
    }

    /**
     * When targeting node we don't want to incorporate
     * modules in the build.
     */
    if (this.bud.state.options.get('target') == 'node') {
      this.options.externals = [nodeExternals()]
    }

    return this.options
  },
})

export {externals}
