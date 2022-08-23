import type {Bud} from '../bud.js'

/**
 * Run the build
 *
 * @public
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (): Promise<void> {
  const app = this as Bud

  const development = app.server?.run

  const production = async () => {
    await app.compiler.compile()
    app.log(app.compiler)
    app.compiler.instance &&
      app.compiler.instance.run(app.compiler.callback)
  }

  app.isDevelopment ? await development() : await production()
}
