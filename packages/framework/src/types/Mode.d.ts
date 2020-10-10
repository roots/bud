import type {Bud} from '../Bud'
import type Webpack from 'webpack'

export {Mode}

/**
 * Mode
 *
 * Helper utility for determining current compilation mode.
 */
declare type Mode = {
  /**
   * Check the currently set mode.
   */
  is: (check: Mode.Modes) => boolean

  /**
   * Get the currently set mode
   */
  get: () => Mode.Modes

  /**
   * Set the mode.
   */
  set: (check: Mode.Modes) => Bud
}

/**
 * Mode namespace
 */
declare namespace Mode {
  /**
   * All possible modes ('development' | 'production' | 'none')
   */
  export type Modes = Webpack.Configuration['mode']
}
