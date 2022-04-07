import {dotenv, dotenvExpand} from '@roots/bud-support'
import {join} from 'node:path'

/**
 * Env context
 * @public
 */
export class Env {
  /** @public */
  [key: string]: string | undefined

  /**
   * Constructor
   * @param baseDirectory -- nearest directory containing package.json from root
   * @public
   */
  public constructor(baseDirectory: string) {
    let values = {}

    Object.entries(process.env).map(([k, v]) => {
      values[k] = v
    })

    const get = (path: string) => {
      const {parsed, error} = dotenv.config({path})
      if (error || !parsed) return

      const expanded = dotenvExpand(parsed)
      if (!expanded) return

      Object.entries(expanded).map(([k, v]) => {
        values[k] = v
      })
    }

    baseDirectory.split('/').reduce((a, c) => {
      const next = join(a, c)
      get(join(next, '.env'))
      return next
    }, `/`)

    Object.entries(values).map(([k, v]: [string, string]) => {
      this[k] = v
    })
  }
}
