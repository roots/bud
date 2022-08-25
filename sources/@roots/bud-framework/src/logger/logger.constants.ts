import figures from 'figures'
import type {SignaleConfig} from 'signale'

/**
 * Instance configuration
 *
 * @internal
 */
export const configDefaults: SignaleConfig = {
  displayScope: true,
  displayBadge: true,
  displayDate: false,
  displayFilename: false,
  displayLabel: false,
  displayTimestamp: false,
  underlineLabel: false,
  underlineMessage: false,
  underlinePrefix: false,
  underlineSuffix: false,
  uppercaseLabel: false,
}

export const enum LEVEL {
  v = `error`,
  vv = `warn`,
  vvv = `debug`,
  vvvv = `info`,
}

export const types = {
  error: {
    badge: figures.cross,
    color: `red`,
    label: `error`,
    logLevel: LEVEL[`v`],
  },
  fatal: {
    badge: figures.cross,
    color: `red`,
    label: `fatal`,
    logLevel: LEVEL[`v`],
  },
  warn: {
    badge: figures.warning,
    color: `yellow`,
    label: `warning`,
    logLevel: LEVEL[`vv`],
  },
  info: {
    badge: figures.info,
    color: `magenta`,
    label: `log`,
    logLevel: LEVEL[`vvvv`],
  },
  success: {
    badge: figures.tick,
    color: `green`,
    label: `success`,
    logLevel: LEVEL[`vvv`],
  },
  debug: {
    badge: figures.circleFilled,
    color: `red`,
    label: `log`,
    logLevel: LEVEL[`vvvv`],
  },
  log: {
    badge: ``,
    color: `blue`,
    label: `log`,
    logLevel: LEVEL[`vvv`],
  },
}
