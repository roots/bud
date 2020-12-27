/**
 * ## bud.logger
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Logger {
  fatal: Logger.LogFn

  error: Logger.LogFn

  warn: Logger.LogFn

  info: Logger.LogFn
}

export namespace Logger {
  export interface LogFn {
    <T extends object>(
      obj: T,
      msg?: string,
      ...args: any[]
    ): void
    (msg: string, ...args: any[]): void
  }
}
