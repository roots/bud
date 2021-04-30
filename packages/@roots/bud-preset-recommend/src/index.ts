import '@roots/bud-api'

import {Framework} from '@roots/bud-framework'

import * as babel from '@roots/bud-babel'
import postcss from '@roots/bud-postcss'
import entrypoints from '@roots/bud-entrypoints'

export const register = (app: Framework) => {
  app.use([babel, postcss, entrypoints]).when(
    ({isProduction}) => isProduction,
    () => app.minimize(),
  )
}
