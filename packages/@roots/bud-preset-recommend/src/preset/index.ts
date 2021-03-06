/**
 * Bud preset: @roots/bud-preset-recommended
 */
import {bud, Bud} from '@roots/bud'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'

export const app: Bud = ((bud: Bud): Bud =>
  bud.use([babel, postcss, entrypoints]).when(
    ({isProduction}) => isProduction,
    (bud: Bud) => bud.minify(),
  ))(bud)

export type {Bud as App}
