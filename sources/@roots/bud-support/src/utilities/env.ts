/* eslint-disable n/no-process-env */
import {join, sep} from 'node:path'

import logger from '@roots/bud-support/logger'

import {dotenv, dotenvExpand} from '../dotenv/index.js'

let env: Record<string, Record<string, string>> = {}

if (global.process.env.BROWSERSLIST_IGNORE_OLD_DATA === undefined) {
  global.process.env.BROWSERSLIST_IGNORE_OLD_DATA = `true`
}
if (global.process.env.NODE_ENV === undefined) {
  global.process.env.NODE_ENV = `production`
}

const get = (basedir: string) => {
  if (basedir in env) return env[basedir]
  env[basedir] = {}

  logger.scope(`env`).time(`sourcing .env values for ${basedir}`)

  Object.assign(env[basedir], {}, global.process.env)
  Object.assign(global.process.env, {}, env[basedir])

  basedir
    .split(sep)
    .splice(1)
    .reduce((basepath, segment) => {
      const path = join(basepath, segment)

      tryRegisteringFromPath(env[basedir], path, `.env`)
      tryRegisteringFromPath(env[basedir], path, `.env.local`)

      return path
    }, sep)

  logger.scope(`env`).timeEnd(`sourcing .env values for ${basedir}`)

  return env[basedir]
}

function tryRegisteringFromPath(
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
