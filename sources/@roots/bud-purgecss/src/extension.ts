import type {Bud} from '@roots/bud-framework/bud'

import {purgecss} from './api.js'

export const label = `@roots/bud-purgecss`

export const dependsOn = new Set([`@roots/bud-postcss`])

export const register = async (app: Bud) => {
  app.api.bindFacade(`purgecss`, purgecss)
}
