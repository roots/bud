import type {Bud} from '@roots/bud-framework'
import type {WebpackError} from '@roots/bud-framework/config'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud) {
  if (this.isProduction) {
    const compilation = await this.compiler.compile(this).catch(error => {
      throw error
    })

    compilation?.run((error: WebpackError) => {
      if (error) this.compiler.onError(error)

      compilation.close((error: WebpackError) => {
        if (error) this.compiler.onError(error)
      })
    })
  }

  if (this.isDevelopment)
    await this.server.run().catch(error => {
      throw error
    })
}
