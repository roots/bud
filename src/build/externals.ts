import type {Bud} from './types'

const externals = (bud: Bud) => ({
  bud,
  options: {
    externals: bud.state.options.externals,
  },
  make: function () {
    return this.options
  },
})

export {externals}
