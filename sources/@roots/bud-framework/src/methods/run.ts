import type {Bud, Compiler} from '@roots/bud-framework'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud) {
  if (this.isProduction) {
    const compilation = await this.compiler
      ?.compile(this)
      .catch(this.catch)

    compilation?.run((error?: Error | null | undefined) => {
      if (!hasCompiler(this)) return
      if (error) this.compiler.onError(error)

      compilation.close((error?: Error | null | undefined) => {
        if (!hasCompiler(this)) return
        if (error) this.compiler.onError(error)
      })
    })
  }

  if (this.isDevelopment && this.server)
    await this.server.run().catch(this.server.catch)
}

function hasCompiler(bud: Bud): bud is Bud & {compiler: Compiler} {
  return bud.compiler !== undefined
}
