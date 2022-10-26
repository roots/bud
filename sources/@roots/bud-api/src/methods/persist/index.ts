import type {Bud} from '@roots/bud-framework'
import {isString} from '@roots/bud-support/lodash-es'

export interface persist {
  (type?: `memory` | `filesystem` | boolean): Bud
}

export const persist: persist = function (
  type: `memory` | `filesystem` | boolean = `filesystem`,
) {
  const app = this as Bud

  if (type === false) {
    app.cache.enabled = false
    app.success(`cache disabled`)
    return app
  }

  app.cache.enabled = true
  app.cache.type = isString(type) ? type : `filesystem`

  app.success(`cache enabled`)

  return app
}
