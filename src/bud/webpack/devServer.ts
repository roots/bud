import type {Bud} from './types'

/**
 * Dev server
 * @param {Bud} bud
 */
const devServer = (bud: Bud) => ({
  bud,
  options: {
    devServer: bud.options.get('dev'),
  },
  make: function () {
    return this.bud.hooks.filter('filter_dev_final', this.options)
  },
})

export {devServer}
