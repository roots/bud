import type {Bud} from '@roots/bud-framework'
import type {MultiStats, WebpackError} from '@roots/bud-framework/config'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud) {
  if (this.isProduction) {
    const compilation = await this.compiler.compile(this)

    compilation?.run(async (error: WebpackError, stats: MultiStats) => {
      if (error) {
        await this.compiler.onError(error)
      }

      compilation.close(async error => {
        if (error) {
          await this.compiler.onError(error)
        }
      })
    })
  }

  if (this.isDevelopment) await this.server.run()
}
