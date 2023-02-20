import type {Bud} from '../bud.js'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud) {
  if (this.isProduction) {
    const compilation = await this.compiler.compile()
    if (!compilation) return

    compilation.run(async (error, stats) => {
      if (error) await this.compiler.onError(error)

      compilation.close(async error => {
        if (error) await this.compiler.onError(error)
      })
    })
  }

  if (this.isDevelopment) {
    await this.server.run()
  }
}
