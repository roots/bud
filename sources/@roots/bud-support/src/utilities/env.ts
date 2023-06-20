/* eslint-disable n/no-process-env */
import logger from '@roots/bud-support/logger'
import {join, sep} from 'node:path'

import {dotenv, dotenvExpand} from '../dotenv/index.js'

let env: Record<string, string> = {}

const get = (basedir: string) => {
  if (env && Object.entries(env).length) return env

  logger.scope(`env`).time(`sourcing .env values`)

  Object.assign(env, {}, process.env)

  basedir
    .split(sep)
    .splice(1)
    .reduce((basepath, segment) => {
      const path = join(basepath, segment)

      tryRegisteringFromPath(path, `.env`)
      tryRegisteringFromPath(path, `.env.local`)

      return path
    }, sep)

  logger.scope(`env`).timeEnd(`sourcing .env values`)

  return env
}

function tryRegisteringFromPath(dir: string, file: string) {
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
