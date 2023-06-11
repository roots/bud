import type {Instance} from '@roots/bud-support/signale'

export interface Logger {
  await(...messages: Array<unknown>): Logger
  debug(...messages: Array<unknown>): Logger
  error(...messages: Array<unknown>): Logger
  info(...messages: Array<unknown>): Logger
  instance: Instance
  log(...messages: Array<unknown>): Logger
  scope(...scopes: Array<string>): Logger
  success(...messages: Array<unknown>): Logger
  time(label: string): Logger
  timeEnd(label: string): Logger
  unscope(): Logger
  warn(...messages: Array<unknown>): Logger
}
