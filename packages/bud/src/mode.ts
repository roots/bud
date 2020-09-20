import {BudInterface} from '.'
import {Configuration} from 'webpack'

/**
 * ## bud.mode
 */
interface Mode {
  /**
   * Check the currently set mode.
   */
  is: (check: Configuration['mode']) => boolean

  /**
   * Get the currently set mode
   */
  get: () => Configuration['mode']

  /**
   * Set the mode.
   */
  set: (check: Configuration['mode']) => BudInterface
}

const mode: (bud: BudInterface) => Mode = bud => ({
  is: check => bud.options.is('webpack.mode', check),
  get: () => bud.options.get('webpack.mode'),
  set: mode => {
    bud.options.set('webpack.mode', mode)

    return bud
  },
})

export {mode as default, Mode}
