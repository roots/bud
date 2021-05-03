/**
 * ## bud.logger
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/@roots/bud-framework
 * [📦 @roots/bud-framework](https://www.npmjs.com/package/@roots/bud-framework)
 * [🔗 Documentation](https://roots.io/bud/tree/master/docs/logging)
 */
export interface Logger {
  instance: Signale

  makeLogger: (props?: {
    scope?: any
    options?: any
    config?: any
  }) => void
}
