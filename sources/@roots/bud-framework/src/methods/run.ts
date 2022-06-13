import type {Bud} from '../bud'

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

  await app.hooks.fire('event.run')

  const development = app.server?.run

  const production = async () => {
    const compiler = await app.compiler.compile()
    compiler.run(app.compiler.callback)
  }

  try {
    app.isDevelopment ? await development() : await production()
  } catch (error) {
    app.error(error)
  }
}
