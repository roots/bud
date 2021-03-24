import {Framework} from '@roots/bud-framework'
import {Bud} from '@roots/bud'

/**
 * Sage theme preset
 *
 */
export type Sage = Bud & Framework

/**
 * Receives the normcore Bud obj from the sage
 * bin. Preconfigures sage and returns to the
 * CLI.
 */
export type SagePreset = (bud: Bud) => Sage

/**
 * Sage theme configuration
 *
 * Function for use in `sage.config.js`. Receives the
 * Sage preset for customization by the theme author.
 */
export type SageConfig = (sage: Sage) => Sage
