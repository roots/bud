import {argv} from 'yargs'
import {env} from './env'
import type {Flags} from './types'

/**
 * Resolve a value from CLI, envvar or a fallback.
 *
 * Order of precedence:
 *  - cli
 *  - env
 *  - fallback
 */
const flag = ([argKey, envKey, fallback]) => {
  const fromCli = argv && argKey ? argv[argKey] : null
  const fromEnv = env && envKey ? env[envKey] : null

  return fromCli ?? fromEnv ?? fallback
}

/**
 * ## bud.state.flags
 *
 * Flags and arguments from CLI and env.
 */
const flags: Flags = {
  repository: {
    mode: flag(['env', 'APP_ENV', 'none']),
    hot: flag(['hot', 'APP_DEV_HOT', false]),
    watch: flag(['watch', 'APP_DEV_WATCH', false]),
    host: flag(['host', 'APP_DEV_HOST', false]),
    port: flag(['port', 'APP_DEV_PORT', null]),
    proxy: flag(['proxy', 'APP_DEV_PROXY', null]),
    src: flag(['src', 'APP_SRC', null]),
    dist: flag(['dist', 'APP_DIST', null]),
    feature: flag(['feature', 'APP_BUILD_FEATURE', null])
  },
  get: function (this: Flags, flag: string): any {
    return this.repository[flag]
  },
  set: function (this: Flags, flags: {flag: string, value: boolean}): void {
    this.repository = {
      ...this.repository,
      ...flags,
    }
  },
  has: function (this: Flags, flag: string): boolean {
    return this.repository.hasOwnProperty(flag)
  },
  is: function (this: Flags, flag: string, value: any): boolean {
    return this.get(flag) === value
  },
}

export {flags}
