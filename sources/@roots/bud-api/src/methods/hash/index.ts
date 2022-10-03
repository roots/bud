import type {Bud} from '@roots/bud-framework'

export interface hash {
  (this: Bud, value?: boolean | ((hash: boolean) => boolean)): Bud
}

export const hash: hash = function (value = true) {
  const app = this as Bud

  app.hooks.on(`feature.hash`, value)

  app.success(`file hashing ${value ? `enabled` : `disabled`}`)

  return app
}
