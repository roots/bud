import type {Bud} from '../bud.js'
import * as configuration from '../configuration/index.js'

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
    await configuration.process(app)
  } catch (error) {
    throw error
  }

  try {
    const production = async () => {
      const instance = await app.compiler.compile()
      instance?.run(app.compiler.callback)
    }

    app.isDevelopment ? await app.server.run() : await production()
  } catch (error) {
    throw error
  }
}
