import {join, sep} from 'node:path'

import dotenv from 'dotenv'
import {expand} from 'dotenv-expand'

/**
 * Context: env
 *
 * @public
 */
export default (basedir: string) => {
  let data

  /**
   * Apply process env
   */
  // eslint-disable-next-line n/no-process-env
  data = process.env

  /**
   * Apply .env & .env.local values in path
   */
  basedir
    .split(sep)
    .splice(1)
    .reduce((basepath, segment) => {
      data = {
        ...data,
        ...trySource(join(basepath, segment, `.env`)),
        ...trySource(join(basepath, segment, `.env.local`)),
      }

      return join(basepath, segment)
    }, sep)

  return data
}

/**
 * Apply expanded values from path
 */
const getEnvFromPath = (path: string): Record<string, any> => {
  let parsed = {}

  try {
    const env = dotenv.config({path})
    if (env?.parsed && !env?.error) Object.assign(parsed, env.parsed)
  } catch (error) {}

  try {
    const expanded = expand({parsed})
    if (expanded?.parsed && !expanded?.error)
      Object.assign(parsed, expanded.parsed)
  } catch (error) {}

  return Object.entries(parsed).reduce(
    (a: Record<string, any>, [k, v]) => ({
      ...a,
      [k]: v,
    }),
    {},
  )
}

const trySource = (envFile: string) => {
  try {
    return getEnvFromPath(envFile)
  } catch (error) {
    return {}
  }
}
