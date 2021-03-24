import '@roots/bud-api'
import '@roots/framework'
import '@roots/bud'

/**
 * Framework base
 */
import type {Framework} from '@roots/bud-framework'

/**
 * Sage theme preset
 */
export type Sage = Framework

export namespace Sage {
  /**
   * Receives the normcore Bud obj from the sage
   * bin. Preconfigures sage and returns to the
   * CLI.
   */
  export type Preset = (bud: Framework) => Sage

  /**
   * Sage theme configuration
   *
   * Function for use in `sage.config.js`. Receives the
   * Sage preset for customization by the theme author.
   */
  export type Config = (sage: Sage) => Sage

  /**
   * Sage dependency check
   *
   * Merges project devDependencies and dependencies arrays and then checks
   * if they include a specified set of dependencies. Returns true if
   * dependencies are utilized, false if not.
   */
  export type Deps = (deps: string[]) => boolean
}
