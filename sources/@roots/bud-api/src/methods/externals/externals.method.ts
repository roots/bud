import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

export interface externals {
  (externals: Configuration['externals']): Bud
}

export const externals: externals = function (externals) {
  const app = this as Bud

  app.hooks.on(
    `build.externals`,
    (existant: Configuration['externals']) => ({
      ...(existant as any),
      ...(externals as any),
    }),
  )

  return app
}
