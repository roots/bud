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

  const production = async () => {
    const instance = await app.compiler.compile()
    if (app.context.args.dry) return app.close()

    instance.run(app.compiler.callback)
  }

  app.isDevelopment ? await app.server.run() : await production()
}
