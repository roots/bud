import '@roots/bud-api'
import {Framework} from '@roots/bud-framework'
import {Bud} from '@roots/bud'

/**
 * Bud preset: @roots/sage
 */
export type Sage = Bud & Framework

/**
 * Receives the normcore bud obj from the sage
 * bin. Preconfigures sage and returns to the
 * CLI.
 */
export type SagePreset = (sage: Sage) => Sage
