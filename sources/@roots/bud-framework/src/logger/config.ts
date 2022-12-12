import figures from '@roots/bud-support/figures'
import type {Config} from '@roots/bud-support/signale'

/**
 * Instance configuration
 *
 * @internal
 */
export const defaults: Config = {
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
    logLevel: level[`v`],
  },
  fatal: {
    badge: figures.cross,
    color: `red`,
    label: `fatal`,
    logLevel: level[`v`],
  },
  warn: {
    badge: figures.warning,
    color: `yellow`,
    label: `warning`,
    logLevel: level[`vv`],
  },
  success: {
    badge: figures.tick,
    color: `green`,
    label: `success`,
    logLevel: level[`vvv`],
  },
  log: {
    badge: ``,
    color: `blue`,
    label: `log`,
    logLevel: level[`vvv`],
  },
  info: {
    badge: figures.info,
    color: `magenta`,
    label: `log`,
    logLevel: level[`vvvv`],
  },
  debug: {
    badge: figures.circleFilled,
    color: `red`,
    label: `log`,
    logLevel: level[`vvvv`],
  },
}
