import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import {isUndefined} from 'lodash-es'
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
   *
   * @public
   */
  public constructor(path: string) {
    /**
     * Apply envvar records to class instance
     *
     * @param obj - Envvar records
     * @returns
     */
    const apply = (obj: Record<string, any>) =>
      obj &&
      Object.entries(obj)
        .filter(([k, v]) => !isUndefined(k) && !isUndefined(v))
        .map(([k, v]: [string, string]) => {
          this[k] = v
        })

    /**
     * Apply values from .env path
     */
    const applyEnvFromPath = (path: string) => {
      const env = dotenv.config({path})
      if (!env || !env?.parsed || env?.error) return

      apply(env.parsed)
      return env
    }

    /**
     * Apply expanded values from path
     */
    const applyExpandedEnvFromPath = (path: string) => {
      const env = applyEnvFromPath(path)
      if (!env || !env?.parsed || env?.error) return

      const expanded = dotenvExpand.expand({parsed: env.parsed})
      if (!expanded?.parsed) return

      apply(expanded.parsed)
    }

    /**
     * Apply process env
     */
    apply(process.env)

    /**
     * Apply env
     */
    path
      .split('/')
      .slice(0, -1)
      .reduce((a, c) => {
        const next = join(a, c)
        applyEnvFromPath(join(next, '.env'))
        return next
      }, `/`)

    /**
     * Expand .env values in immediate directory
     */
    applyExpandedEnvFromPath(join(path, '.env'))
  }
}
