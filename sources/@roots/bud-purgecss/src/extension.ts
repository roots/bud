import {purgecss} from './api.js'

export const label = '@roots/bud-purgecss'

export const dependsOn = new Set(['@roots/bud-postcss'])

export const register = async (_options, app) => {
  app.api.bindFacade('purgecss', purgecss)
}
