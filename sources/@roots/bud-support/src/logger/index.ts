// @ts-nocheck

import figures from '@roots/bud-support/figures'
export {figures}

export {format} from 'pretty-format'

import type {
  Signale as Instance,
  SignaleConfig as Config,
  SignaleOptions as Options,
} from 'signale'
import * as SignaleModule from 'signale'

const Logger = SignaleModule.default.Signale

/**
 * Instance configuration
 */
const config: Config = {
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

const types = {
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
  deprecated: {
    badge: figures.lozenge,
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

const defaultOptions = {
  config,
  scope: `@roots/bud`,
  types,
}

let instance = new Logger(defaultOptions)

const make = (
  options: Options = {},
  ...scope: Array<string>
): Instance => {
  return new Logger({...defaultOptions, ...options}).scope(...scope)
}

export default instance
export {Logger, Instance, Options, make}
