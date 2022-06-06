import dotenv from 'dotenv'
import {expand} from 'dotenv-expand'
import {join} from 'node:path'

/**
 * Context: env
 *
 * @public
 */
export class Env {
  /**
   * Env dictionary
   *
   * @public
   */
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
      const env = dotenv.config({path})
      if (!env?.parsed || env?.error) return

      const expanded = expand(env)
      if (!expanded) return

      Object.entries(expanded.parsed).map(([k, v]) => {
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
