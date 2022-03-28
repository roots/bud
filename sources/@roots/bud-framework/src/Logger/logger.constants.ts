import {figures} from '@roots/bud-support'

import {Framework} from './logger.interface'

/**
 * Instance configuration
 *
 * @internal
 */
export const INSTANCE_CONFIG: any = {
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

export const enum LEVEL {
  VERBOSE = 'log',
  STANDARD = 'timer',
  ERROR = 'error',
}

export const types: (app: Framework) => Record<string, Type> = app => ({
  error: {
    badge: figures.cross,
    color: 'red',
    label: 'error',
    logLevel: LEVEL.ERROR,
  },
  fatal: {
    badge: figures.cross,
    color: 'red',
    label: 'fatal',
    logLevel: LEVEL.ERROR,
  },
  star: {
    badge: figures.star,
    color: 'cyan',
    label: 'instantiate',
    logLevel: LEVEL.STANDARD,
  },
  info: {
    badge: figures.info,
    color: 'magenta',
    label: 'log',
    logLevel: LEVEL.VERBOSE,
  },
  success: {
    badge: figures.tick,
    color: 'green',
    label: 'success',
    logLevel: LEVEL.STANDARD,
  },
  warn: {
    badge: figures.warning,
    color: 'yellow',
    label: 'warning',
    logLevel: LEVEL.STANDARD,
  },
  complete: {
    badge: figures.circleFilled,
    color: 'cyan',
    label: 'complete',
    logLevel: LEVEL.STANDARD,
  },
  pending: {
    badge: figures.ellipsis,
    color: 'cyan',
    label: 'pending',
    logLevel: LEVEL.STANDARD,
    stream: process.stdout,
  },
  note: {
    badge: figures.bullet,
    color: 'blue',
    label: 'note',
    logLevel: LEVEL.STANDARD,
  },
  start: {
    badge: figures.play,
    color: 'green',
    label: 'start',
    logLevel: LEVEL.STANDARD,
  },
  pause: {
    badge: figures.squareSmallFilled,
    color: 'yellow',
    label: 'pause',
    logLevel: LEVEL.STANDARD,
  },
  debug: {
    badge: figures.circleFilled,
    color: 'red',
    label: 'log',
    logLevel: LEVEL.VERBOSE,
  },
  await: {
    badge: figures.ellipsis,
    color: 'cyan',
    label: 'awaiting',
    logLevel: LEVEL.STANDARD,
  },
  watch: {
    badge: figures.ellipsis,
    color: 'yellow',
    label: 'watching',
    logLevel: LEVEL.STANDARD,
  },
  log: {
    badge: figures.pointer,
    color: 'blue',
    label: 'log',
    logLevel: LEVEL.STANDARD,
  },
})
