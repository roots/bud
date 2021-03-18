import {bud as base, Bud} from '@roots/bud'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'

export const bud: Bud = base
  .use([babel, postcss, entrypoints])
  .when(
    ({isProduction}) => isProduction,
    (bud: Bud) => bud.minify(),
  )

export {Bud}
