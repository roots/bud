import {join, sep} from 'node:path'

import {dotenv, dotenvExpand} from '@roots/bud-support/dotenv'

/**
 * Context: env
 *
 * @public
 */
export default ({basedir, ...overrides}) => {
  /**
   * Apply process env
   */
  // eslint-disable-next-line n/no-process-env
  let data: Record<string, string> = process.env

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

  return {...data, ...(overrides ?? {})}
}

/**
 * Apply expanded values from path
 */
const getEnvFromPath = (path: string): Record<string, any> => {
  let parsed: Record<string, string> = {}

  try {
    const env = dotenv.config({path})
    if (env?.parsed && !env?.error) Object.assign(parsed, env.parsed)
  } catch (error) {}

  try {
    const expanded = dotenvExpand.expand({parsed})
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
