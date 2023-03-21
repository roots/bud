/* eslint-disable n/no-process-env */
import {join, sep} from 'node:path'

import {dotenv, dotenvExpand} from '../dotenv/index.js'
import logger from './logger.js'

let env = process.env

const get = (basedir: string) => {
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

  logger.scope(`env`).info(`Environment variables loaded`)
  logger.unscope()

  return env
}

export {env, get}
