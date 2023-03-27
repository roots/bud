/* eslint-disable n/no-process-env */
import {join, sep} from 'node:path'

import {dotenv, dotenvExpand} from '../dotenv/index.js'
import logger from './logger.js'

let env: Record<string, string> = {}

const get = (basedir: string) => {
  if (env && Object.entries(env).length) return env

  Object.assign(env, {}, process.env)

  basedir
    .split(sep)
    .splice(1)
    .reduce((basepath, segment) => {
      const path = join(basepath, segment)

      try {
        const config = dotenv.config({path: join(path, `.env`)})
        if (config?.parsed && !config?.error)
          Object.assign(env, config.parsed)
        let expanded = dotenvExpand.expand({parsed: config.parsed})
        if (expanded?.parsed && !expanded?.error)
          Object.assign(env, expanded.parsed)
      } catch (e) {}

      try {
        const config = dotenv.config({path: join(path, `.env.local`)})
        if (config?.parsed && !config?.error)
          Object.assign(env, config.parsed)
        let expanded = dotenvExpand.expand({parsed: config.parsed})
        if (expanded?.parsed && !expanded?.error)
          Object.assign(env, expanded.parsed)
      } catch (e) {}

      return path
    }, sep)

  logger.scope(`env`).log(`Environment variables loaded`)

  return env
}

export {env, get}
