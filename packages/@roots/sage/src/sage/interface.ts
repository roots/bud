import {Bud} from '@roots/bud'
import {Module} from '@roots/bud-framework'

/**
 * Sage theme preset
 */
export interface Sage extends Bud {}

export namespace Sage {
  /**
   * Sage preset config
   *
   * Function exported from `@roots/sage`.
   * Provides a base configuration to be passed to theme.
   */
  export type Preset = (sage: Sage) => Sage

  /**
   * Sage theme config
   *
   * Function exported from `sage.config.js`. Receives the
   * Sage preset for customization by the theme author.
   */
  export type Config = (sage: Sage) => Sage

  /**
   * Sage dependency check
   *
   * Merges project devDependencies and dependencies arrays
   * of a project package.json source. Then checks if the merged
   * dependencies array includes a specified dependency.
   *
   * Returns true if utilized, false if not.
   */
  export type Deps = (deps: string[]) => boolean
}

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/sage': Module
    }
  }
}
