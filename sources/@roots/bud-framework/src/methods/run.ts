import type {Bud} from '@roots/bud-framework'
import type {
  MultiStats,
  WebpackError,
} from '@roots/bud-framework/types/config'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud) {
  if (this.isProduction) {
    const compilation = await this.compiler.compile(this)

    compilation?.run(
      async function (error: WebpackError, _stats: MultiStats) {
        if (error) {
          await this.compiler.onError(error)
        }

        compilation.close(async error => {
          if (error) {
            await this.compiler.onError(error)
          }
        })
      }.bind(this),
    )
  }

  if (this.isDevelopment) await this.server.run()
}
