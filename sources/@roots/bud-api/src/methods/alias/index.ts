import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

interface AliasObject {
  [key: string]: string | false | string[]
}

export interface facade {
  (
    ...input:
      | [AliasObject & Configuration['resolve']['alias']]
      | [string, string | false | string[]]
  ): Bud
}

export interface alias {
  (
    ...input:
      | [AliasObject & Configuration['resolve']['alias']]
      | [string, string | false | string[]]
  ): Promise<Bud>
}

export const alias: alias = async function (...input) {
  const app = this as Bud

  const records: AliasObject =
    typeof input[0] === 'string' ? {[input[0]]: input[1]} : input[0]

  app.hooks.async('build.resolve.alias', async aliases => {
    return {...(aliases ?? {}), ...(records ?? {})}
  })

  return app
}
