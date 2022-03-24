import {dotenv, dotenvExpand} from '@roots/bud-support'
import {join} from 'node:path'

export class Env {
  [key: string]: string | undefined

  /**
   * Constructor
   *
   * @param baseDirectory -- nearest directory containing package.json from root
   * @returns
   */
  public constructor(baseDirectory: string) {
    const paths = baseDirectory.split('/')

    Object.entries(process.env).map(([k, v]) => (this[k] = v))

    const get = (path: string) => {
      const {parsed, error} = dotenv.config({path})
      if (error || !parsed) return
      const expanded = dotenvExpand(parsed)
      if (!expanded) return
      Object.entries(expanded).map(([k, v]) => (this[k] = v))
    }

    paths.reduce((a, c) => {
      const next = join(a, c)
      get(join(next, '.env'))
      return next
    }, `/`)
  }
}
