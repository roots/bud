/* eslint-disable n/no-process-env */
import {join, sep} from 'node:path'

import args, {includes} from '@roots/bud-framework/bootstrap/args'
import {dotenv, dotenvExpand} from '@roots/bud-support/dotenv'
import isEqual from '@roots/bud-support/isEqual'
import logger from '@roots/bud-support/logger'

const env: Record<string, Record<string, string | undefined>> = {}

const get = (basedir: string) => {
  if (basedir in env) return env[basedir]

  env[basedir] = {}

  logger.scope(`env`).log(`Sourcing .env values for ${basedir}`)

  basedir
    .split(sep)
    .splice(1)
    .reduce((basepath, segment) => {
      const path = join(basepath, segment)

      tryRegisteringFromPath(env[basedir], path, `.env`)
      tryRegisteringFromPath(env[basedir], path, `.env.local`)

      return path
    }, sep)

  if (env[basedir].BROWSERSLIST_IGNORE_OLD_DATA === undefined) {
    env[basedir].BROWSERSLIST_IGNORE_OLD_DATA = `true`
  }

  if (!env[basedir].NODE_ENV) {
    if (global.process.env.NODE_ENV)
      env[basedir].NODE_ENV = global.process.env.NODE_ENV

    if (args.mode) {
      env[basedir].NODE_ENV = args.mode
    }

    if (includes(`production`) || includes(`prod`))
      env[basedir].NODE_ENV = `production`

    if (includes(`development`) || includes(`dev`))
      env[basedir].NODE_ENV = `development`

    if (!env[basedir].NODE_ENV) env[basedir].NODE_ENV = `production`
  }

  env[basedir] = {
    ...env[basedir],
    ...global.process.env,
  }

  global.process.env = {
    ...global.process.env,
    ...env[basedir],
  }

  return env[basedir]
}

function tryRegisteringFromPath(
  env: Record<string, string | undefined>,
  dir: string,
  file: string,
) {
  const path = join(dir, file)

  try {
    const config = dotenv.config({
      override: true,
      path,
    })

    if (config?.parsed && !config?.error) {
      if (env !== config.parsed) {
        logger.scope(`env`).log(`Setting .env values from`, path)
        env = {...env, ...config.parsed}
      }
    }

    let expanded = dotenvExpand.expand({parsed: config.parsed})
    if (expanded?.parsed && !expanded?.error) {
      if (!isEqual(expanded.parsed, config.parsed)) {
        logger.scope(`env`).log(`Setting expanded .env values from`, path)
        env = {...env, ...expanded.parsed}
      }
    }
  } catch (e) {
    logger.scope(`env`).log(`Error loading env in ${path}`, e)
  }
}

export {env, get}
