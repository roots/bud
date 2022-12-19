export interface Logger {
  instance: any
  setCommonPath(path: string): Promise<Logger>
  fatal(...messages: Array<unknown>): Logger
  time(label: string): Logger
  timeEnd(label: string): Logger
  make(...scope: Array<string>): Logger
  debug(...messages: Array<unknown>): Logger
  log(...messages: Array<unknown>): Logger
  success(...messages: Array<unknown>): Logger
  warn(...messages: Array<unknown>): Logger
  error(...messages: Array<unknown>): Logger
  fatal(...messages: Array<unknown>): Logger
  info(...messages: Array<unknown>): Logger
  time(label: string): Logger
  timeEnd(label: string): Logger
  await(...messages: Array<unknown>): Logger
  scope(...scopes: Array<string>): this
}
