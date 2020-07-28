import type {Bud} from './types'

/**
 * Dev server
 * @param {Bud} bud
 */
const devServer = (bud: Bud) => ({
  bud,
  options: {
    devServer: bud.state.options.dev,
  },
  make: function () {
    return this.options
  },
})

export {devServer}
