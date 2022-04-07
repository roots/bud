import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface facade {
  (alias: Configuration['resolve']['alias']): Bud
}

export interface alias {
  (alias: Configuration['resolve']['alias']): Promise<Bud>
}

export const alias: alias = async function (input) {
  const app = this as Bud

  input = Object.entries(input).reduce((a, [k, v]) => {
    if (v.startsWith('@')) {
      return {...a, [k]: app.path(v)}
    }

    if (!v.startsWith('/')) {
      return {...a, [k]: app.path(v)}
    }

    return {...a, [k]: v}
  }, {})

  app.hooks.async('build.resolve.alias', async aliases => {
    return {...(aliases ?? {}), ...(input ?? {})}
  })

  return app
}
