import type {Bud} from './types'
import nodeExternals from 'webpack-node-externals'

const externals = (bud: Bud) => ({
  bud,
  options: {},
  make: function () {
    if (this.bud.state.options.externals) {
      this.options.externals = this.bud.state.options.externals
    }

    if (this.bud.state.options.target == 'node') {
      this.options.externals = [nodeExternals()]
    }

    return this.options
  },
})

export {externals}
