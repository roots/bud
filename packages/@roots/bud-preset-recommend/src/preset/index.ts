/**
 * Bud preset: @roots/bud-preset-recommended
 */
import {bud, Bud} from '@roots/bud'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'
import * as imagemin from '@roots/bud-imagemin'
import * as terser from '@roots/bud-terser'

export const app: Bud = (() =>
  bud.use([babel, postcss, entrypoints, terser]).when(
    ({isProduction}) => isProduction,
    (sage: Bud) => sage.use([imagemin, terser]).minify(),
  ))()

export type {Bud as App}
