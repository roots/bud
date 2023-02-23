import type {Bud} from '../bud.js'

export interface run {
  (this: Bud): Promise<void>
}

export async function run(this: Bud): Promise<void> {
  const compilation = await this.compiler.compile()

  if (this.isProduction) {
    if (!compilation) return

    compilation.run(async error => {
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
