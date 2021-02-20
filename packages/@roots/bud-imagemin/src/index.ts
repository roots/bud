import './interfaces'

import * as Plugin from './imagemin'

/**
 * Extension name
 */
export const name = '@roots/bud-imagemin'

/**
 * Extension config methods
 */
export * as api from './api'

/**
 * Extension boot
 */
export const boot = bud => {
  bud.use(Plugin)
}
