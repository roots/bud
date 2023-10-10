/* eslint-disable n/no-process-env */
import {join, sep} from 'node:path'

import args from '@roots/bud-framework/context/args'
import {dotenv, dotenvExpand} from '@roots/bud-support/dotenv'
import logger from '@roots/bud-support/logger'

let env: Record<string, Record<string, string>> = {}

const get = (basedir: string) => {
  if (basedir in env) return env[basedir]
  env[basedir] = {}

  logger.scope(`env`).time(`sourcing .env values for ${basedir}`)

  basedir
    .split(sep)
    .splice(1)
    .reduce((basepath, segment) => {
      const path = join(basepath, segment)

      tryEnv(env[basedir], path, `.env`)
      tryEnv(env[basedir], path, `.env.local`)

      return path
    }, sep)

  logger.scope(`env`).timeEnd(`sourcing .env values for ${basedir}`)

  if (env[basedir].BROWSERSLIST_IGNORE_OLD_DATA === undefined) {
    env[basedir].BROWSERSLIST_IGNORE_OLD_DATA = `true`
  }

  if (!env[basedir].NODE_ENV) {
    if (process.env.NODE_ENV) env[basedir].NODE_ENV = process.env.NODE_ENV
    if (args.mode) env[basedir].NODE_ENV = args.mode
    if (args._?.includes(`production`))
      env[basedir].NODE_ENV = `production`
    if (args._?.includes(`development`) || args._?.includes(`dev`))
      env[basedir].NODE_ENV = `development`

    if (!env[basedir].NODE_ENV) env[basedir].NODE_ENV = `production`
  }

  Object.assign(env[basedir], {}, global.process.env)
  Object.assign(global.process.env, {}, env[basedir])

  return env[basedir]
}

function tryEnv(
  env: Record<string, unknown>,
  dir: string,
  file: string,
) {
  const path = join(dir, file)

  try {
    const config = dotenv.config({path})
    if (config?.parsed && !config?.error) {
      logger.scope(`env`).log(`registering values`, path)
      Object.assign(env, config.parsed)
    }

    let expanded = dotenvExpand.expand({parsed: config.parsed})
    if (expanded?.parsed && !expanded?.error) {
      logger.scope(`env`).log(`registering expanded values`, path)
      Object.assign(env, expanded.parsed)
    }
  } catch (e) {
    logger.scope(`env`).log(`Error loading env in ${path}`, e)
  }
}

export {env, get}
