import {Framework} from '../'
import {figures} from './figures'
import {LEVEL} from './logger.levels'

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

export const types: (app: Framework) => Record<string, Type> = app => ({
  error: {
    badge: figures.cross,
    color: 'red',
    label: 'error',
    logLevel: LEVEL.ERROR,
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
  debug: {
    badge: figures.circleFilled,
    color: 'red',
    label: 'log',
    logLevel: LEVEL.VERBOSE,
  },
  log: {
    badge: figures.pointer,
    color: 'blue',
    label: 'log',
    logLevel: LEVEL.STANDARD,
  },
})
