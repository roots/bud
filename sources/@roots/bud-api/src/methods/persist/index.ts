import type {Bud} from '@roots/bud-framework'

export interface persist {
  (type?: `memory` | `filesystem` | false): Bud
}

export const persist: persist = function (
  type: `memory` | `filesystem` | false = `filesystem`,
) {
  const app = this as Bud

  if (type === false) {
    app.cache.enabled = false
    app.success(`cache disabled`)
    return app
  }

  app.cache.enabled = true
  app.cache.type = type

  app.success(`cache enabled`)

  return app
}
