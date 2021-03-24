import '@roots/bud-api'

import {Framework} from '@roots/bud-framework'
import * as babel from '@roots/bud-babel'
import * as postcss from '@roots/bud-postcss'
import * as entrypoints from '@roots/bud-entrypoints'

export const register = (app: Framework) => {
  app.use([babel, postcss, entrypoints]).when(
    ({isProduction}) => isProduction,
    () => app.minify(),
  )
}
