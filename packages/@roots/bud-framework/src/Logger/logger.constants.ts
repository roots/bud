import {SignaleConfig} from 'signale'

import {figures} from './figures'

/**
 * Instance configuration
 */
export const INSTANCE_CONFIG: SignaleConfig = {
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

export type INSTANCE_CONFIG = SignaleConfig

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

export interface INSTANCE_TYPES extends Record<string, Type> {}

export const INSTANCE_TYPES: INSTANCE_TYPES = {
  error: {
    badge: figures.cross,
    color: 'red',
    label: 'error',
    logLevel: 'error',
  },
  fatal: {
    badge: figures.cross,
    color: 'red',
    label: 'fatal',
    logLevel: 'error',
  },
  fav: {
    badge: `\n${figures.heart}`,
    color: 'magenta',
    label: 'bootstrapping',
    logLevel: 'info',
  },
  info: {
    badge: figures.info,
    color: 'blue',
    label: 'info',
    logLevel: 'info',
  },
  star: {
    badge: figures.star,
    color: 'yellow',
    label: 'star',
    logLevel: 'info',
  },
  success: {
    badge: figures.tick,
    color: 'green',
    label: 'success',
    logLevel: 'info',
  },
  wait: {
    badge: figures.ellipsis,
    color: 'blue',
    label: 'waiting',
    logLevel: 'info',
  },
  warn: {
    badge: figures.warning,
    color: 'yellow',
    label: 'warning',
    logLevel: 'warn',
  },
  complete: {
    badge: figures.circleFilled,
    color: 'cyan',
    label: 'complete',
    logLevel: 'info',
  },
  pending: {
    badge: figures.ellipsis,
    color: 'magenta',
    label: 'pending',
    logLevel: 'info',
    stream: process.stdout,
  },
  note: {
    badge: figures.bullet,
    color: 'blue',
    label: 'note',
    logLevel: 'info',
  },
  start: {
    badge: figures.play,
    color: 'green',
    label: 'start',
    logLevel: 'info',
  },
  pause: {
    badge: figures.squareSmallFilled,
    color: 'yellow',
    label: 'pause',
    logLevel: 'info',
  },
  debug: {
    badge: figures.circleFilled,
    color: 'red',
    label: 'debug',
    logLevel: 'debug',
  },
  await: {
    badge: figures.ellipsis,
    color: 'magenta',
    label: 'processing',
    logLevel: 'info',
  },
  watch: {
    badge: figures.ellipsis,
    color: 'yellow',
    label: 'watching',
    logLevel: 'info',
  },
  log: {
    badge: figures.dot,
    color: 'blue',
    label: 'log',
    logLevel: 'info',
  },
}
