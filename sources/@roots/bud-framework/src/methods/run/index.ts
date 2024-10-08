import type {Bud, Compiler} from '@roots/bud-framework'

import {BudError} from '@roots/bud-support/errors'

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

    if (!compilation) return

    compilation.run((error?: Error | null | undefined) => {
      compilation.close((error?: Error | null | undefined) => {
        if (!hasCompiler(this)) return
        if (error) this.catch(BudError.normalize(error))
      })
    })
  }

  if (this.isDevelopment && this.server)
    await this.server.run().catch(this.server.catch)
}

function hasCompiler(bud: Bud): bud is {compiler: Compiler} & Bud {
  return bud.compiler !== undefined
}
