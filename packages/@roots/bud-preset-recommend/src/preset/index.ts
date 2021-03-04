/**
 * Bud preset: @roots/bud-preset-recommended
 */
import {bud as base, Bud} from '@roots/bud'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'
import * as imagemin from '@roots/bud-imagemin'
import * as terser from '@roots/bud-terser'

export const bud = base
  .use([babel, postcss, entrypoints, terser])
  .when(
    ({isProduction}) => isProduction,
    (sage: Bud) => sage.use([imagemin, terser]).minify(),
  )
