import type Webpack from 'webpack'

/**
 * Mode
 *
 * Helper utility for determining current compilation mode.
 */
export declare type Mode = {
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
  set: (check: Mode.Modes) => void
}

/**
 * Mode namespace
 */
export declare namespace Mode {
  /**
   * All possible modes ('development' | 'production' | 'none')
   */
  export type Modes = Webpack.Configuration['mode']
}
