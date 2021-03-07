/**
 * Bud preset: @roots/bud-preset-recommended
 */
import {bud, Bud} from '@roots/bud'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'

declare type App = Bud

export const app: App = ((bud: Bud) => {
  bud.use([babel, postcss, entrypoints])

  bud.when(
    ({isProduction}) => isProduction,
    (bud: Bud) => bud.minify(),
  )

  return bud
})(bud)

export type {App, Bud}
