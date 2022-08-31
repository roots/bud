import dotenv from 'dotenv'
import {expand} from 'dotenv-expand'
import {join, sep} from 'node:path/posix'

/**
 * Context: env
 *
 * @public
 */
export default class Env {
  /**
   * Service label
   *
   * @public
   */
  public static label = `env`

  /**
   * Env dictionary
   *
   * @public
   */
  public data: Record<string, any> = {}

  /**
   * Constructor
   *
   * @public
   */
  public constructor(basedir: string) {
    /**
     * Apply envvar records to class instance
     *
     * @param obj - Envvar records
     * @returns
     */
    const filterUndefined = (
      obj: Record<string, string>,
    ): Record<string, string> => {
      if (!obj) return {}

      return Object.entries(obj).reduce(
        (values: Record<string, string>, [k, v]: [string, string]) => ({
          ...values,
          [k]: v,
        }),
        {},
      )
    }

    /**
     * Apply values from .env path
     */
    const getEnvFromPath = (path: string): Record<string, string> => {
      const env = dotenv.config({path})
      if (!env || !env?.parsed || env?.error) return {}

      return filterUndefined(env.parsed)
    }

    /**
     * Apply expanded values from path
     */
    const getExpandedEnvFromPath = (path: string): Record<string, any> => {
      const env = getEnvFromPath(path)

      const expanded = expand({parsed: env})
      if (!expanded || !expanded.parsed || expanded.error) return {}

      return filterUndefined(
        Object.entries(expanded.parsed).reduce(
          (a: Record<string, any>, [k, v]) => ({
            ...a,
            [k]: v,
          }),
          {},
        ),
      )
    }

    /**
     * Apply process env
     */
    // eslint-disable-next-line n/no-process-env
    Object.entries(filterUndefined(process.env)).map(([k, v]) => {
      this.data[k] = v
    })

    /**
     * Apply .env & .env.local values in path
     */
    basedir
      .split(sep)
      .slice(0, -1)
      .reduce((a, c) => {
        const next = join(a, c)

        this.data = {
          ...this.data,
          ...getEnvFromPath(join(a, c, `.env`)),
          ...getEnvFromPath(join(a, c, `.env.local`)),
        }

        return next
      }, sep)

    /**
     * Expand .env & .env.local values in project root
     */
    this.data = {
      ...this.data,
      ...getExpandedEnvFromPath(join(basedir, `.env`)),
      ...getExpandedEnvFromPath(join(basedir, `.env.local`)),
    }
  }
}
