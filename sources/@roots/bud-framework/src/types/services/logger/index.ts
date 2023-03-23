import type {Instance} from '@roots/bud-support/signale'

export interface Logger {
  instance: Instance
  time(label: string): Logger
  timeEnd(label: string): Logger
  debug(...messages: Array<unknown>): Logger
  log(...messages: Array<unknown>): Logger
  success(...messages: Array<unknown>): Logger
  warn(...messages: Array<unknown>): Logger
  error(...messages: Array<unknown>): Logger
  info(...messages: Array<unknown>): Logger
  await(...messages: Array<unknown>): Logger
  scope(...scopes: Array<string>): Logger
  unscope(): Logger
}
