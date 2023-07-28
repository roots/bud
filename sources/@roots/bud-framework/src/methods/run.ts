import type {Bud} from '@roots/bud-framework'
import type {WebpackError} from '@roots/bud-framework/config'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud) {
  if (this.isProduction && this.compiler) {
    const compilation = await this.compiler
      ?.compile(this)
      .catch(this.catch)

    compilation?.run((error: WebpackError) => {
      if (error) this.compiler.onError(error)

      compilation.close((error: WebpackError) => {
        if (error) this.compiler.onError(error)
      })
    })
  }

  if (this.isDevelopment && this.server)
    await this.server.run().catch(this.server.catch)
}
