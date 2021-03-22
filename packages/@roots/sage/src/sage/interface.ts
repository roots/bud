import {Bud} from '@roots/bud'

/**
 * Bud preset: @roots/sage
 */
export type Sage = Bud

/**
 * Receives the normcore bud obj from the sage
 * bin. Preconfigures sage and returns to the
 * CLI.
 */
export type SagePreset = (sage: Sage) => Sage
