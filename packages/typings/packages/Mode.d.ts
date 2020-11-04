/**
 * Mode
 *
 * Helper utility for determining current compilation mode.
 *
 * @see {Webpack.Mode}
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
 * Mode
 */
export declare namespace Mode {
  /**
   * All possible modes ('development' | 'production' | 'none')
   */
  export type Modes = Framework.Webpack.Configuration['mode']
}
