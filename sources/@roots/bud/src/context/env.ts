import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import {isUndefined} from 'lodash-es'
import {join, sep} from 'node:path/posix'

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

  return Object.entries(obj)
    .filter(([k, v]) => ![k, v].map(isUndefined).length)
    .reduce(
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
  if (!env || !env?.parsed || env?.error) return
  return filterUndefined(env.parsed)
}

/**
 * Apply expanded values from path
 */
const getExpandedEnvFromPath = (path: string): Record<string, any> => {
  const env = getEnvFromPath(path)
  const expanded = dotenvExpand.expand({parsed: env})
  if (!expanded || !expanded?.parsed || expanded?.error) return {}

  return filterUndefined(
    Object.entries(expanded.parsed).reduce(
      (a: Record<string, any>, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
      {},
    ),
  )
}

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
  [key: string]: any

  /**
   * Constructor
   *
   * @public
   */
  public constructor(path: string) {
    /**
     * Apply process env
     */
    Object.assign(this, filterUndefined(process.env))

    /**
     * Apply .env & .env.local values in path
     */
    path
      .split(sep)
      .slice(0, -1)
      .reduce((a, c) => {
        const next = join(a, c)
        Object.assign(this, {
          ...getEnvFromPath(join(a, c, '.env')),
          ...getEnvFromPath(join(a, c, '.env.local')),
        })
        return next
      }, sep)

    /**
     * Expand .env & .env.local values in project root
     */
    Object.assign(this, {
      ...getExpandedEnvFromPath(join(path, '.env')),
      ...getExpandedEnvFromPath(join(path, '.env.local')),
    })
  }
}
