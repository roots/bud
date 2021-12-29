import {SignaleConfig} from 'signale'

import {figures} from './figures'

export type INSTANCE_CONFIG = SignaleConfig

/**
 * Instance configuration
 *
 * @internal
 */
export const INSTANCE_CONFIG: SignaleConfig = {
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

/**
 * @internal
 */
interface Type {
  /** The icon corresponding to the logger. */
  badge: string
  /**
   * The color of the label, can be any of the foreground colors supported by
   * [chalk](https://github.com/chalk/chalk#colors).
   */
  color: string
  /** The label used to identify the type of the logger. */
  label: string
  logLevel?: string | undefined
  stream?: NodeJS.WriteStream | NodeJS.WriteStream[] | undefined
}

/**
 * @internal
 */
export interface types {
  [key: string]: Type
}

export const LEVEL = {
  vvvv: 'log',
  vvv: 'timer',
  vv: 'warn',
  v: 'error',
}

export const types = () => ({
  error: {
    badge: figures.cross,
    color: 'red',
    label: 'error',
    logLevel: LEVEL['v'],
  },
  fatal: {
    badge: figures.cross,
    color: 'red',
    label: 'fatal',
    logLevel: LEVEL['v'],
  },
  star: {
    badge: figures.star,
    color: 'cyan',
    label: 'instantiate',
    logLevel: LEVEL['vvv'],
  },
  info: {
    badge: figures.info,
    color: 'magenta',
    label: 'log',
    logLevel: LEVEL['vvv'],
  },
  success: {
    badge: figures.tick,
    color: 'green',
    label: 'success',
    logLevel: LEVEL['vvv'],
  },
  warn: {
    badge: figures.warning,
    color: 'yellow',
    label: 'warning',
    logLevel: LEVEL['vv'],
  },
  complete: {
    badge: figures.circleFilled,
    color: 'cyan',
    label: 'complete',
    logLevel: LEVEL['vvv'],
  },
  pending: {
    badge: figures.ellipsis,
    color: 'cyan',
    label: 'pending',
    logLevel: LEVEL['vvv'],
    stream: process.stdout,
  },
  note: {
    badge: figures.bullet,
    color: 'blue',
    label: 'note',
    logLevel: LEVEL['vvv'],
  },
  start: {
    badge: figures.play,
    color: 'green',
    label: 'start',
    logLevel: LEVEL['vvv'],
  },
  pause: {
    badge: figures.squareSmallFilled,
    color: 'yellow',
    label: 'pause',
    logLevel: LEVEL['vvv'],
  },
  debug: {
    badge: figures.circleFilled,
    color: 'red',
    label: 'log',
    logLevel: LEVEL['vvvv'],
  },
  await: {
    badge: figures.ellipsis,
    color: 'cyan',
    label: 'awaiting',
    logLevel: LEVEL['vvv'],
  },
  watch: {
    badge: figures.ellipsis,
    color: 'yellow',
    label: 'watching',
    logLevel: LEVEL['vvv'],
  },
  log: {
    badge: figures.pointer,
    color: 'blue',
    label: 'log',
    logLevel: LEVEL['vvv'],
  },
})
