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

  try {
    const production = async () => {
      const instance = await app.compiler.compile()
      instance?.run(app.compiler.callback)
    }

    app.isDevelopment ? await app.server.run() : await production()
  } catch (error) {
    if (app.isProduction) throw error
  }
}
