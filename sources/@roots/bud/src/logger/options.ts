import figures from '@roots/bud-support/figures'
import type {Config} from '@roots/bud-support/signale'

/**
 * Instance configuration
 */
export const config: Config = {
  displayScope: true,
  displayBadge: true,
  displayDate: false,
  displayFilename: false,
  displayLabel: true,
  displayTimestamp: false,
  underlineLabel: false,
  underlineMessage: false,
  underlinePrefix: false,
  underlineSuffix: false,
  uppercaseLabel: false,
}

export const level = [`error`, `warn`, `debug`, `info`]

export const types = {
  error: {
    badge: figures.cross,
    color: `red`,
    label: `error`,
    logLevel: `error`,
  },
  fatal: {
    badge: figures.cross,
    color: `red`,
    label: `fatal`,
    logLevel: `error`,
  },
  warn: {
    badge: figures.warning,
    color: `yellow`,
    label: `warning`,
    logLevel: `warn`,
  },
  success: {
    badge: figures.tick,
    color: `green`,
    label: `success`,
    logLevel: `debug`,
  },
  log: {
    badge: figures.nodejs,
    color: `blue`,
    label: `log`,
    logLevel: `debug`,
  },
  info: {
    badge: figures.info,
    color: `cyan`,
    label: `info`,
    logLevel: `info`,
  },
  debug: {
    badge: figures.circleFilled,
    color: `red`,
    label: `log`,
    logLevel: `info`,
  },
}
