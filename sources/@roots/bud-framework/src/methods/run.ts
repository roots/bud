import type {Bud} from '../bud.js'

/**
 * Run the build
 */
export interface run {
  (): Promise<true | Error>
}

export const run: run = async function (this: Bud) {
  return await new Promise(async (resolve, reject) => {
    if (this.isProduction) {
      const compilation = await this.compiler.compile()
      if (!compilation) return

      compilation.run(async (error, stats) => {
        if (error) await this.compiler.onError(error)

        compilation.close(async error => {
          if (error) {
            await this.compiler.onError(error)
            reject(error)
          }

          resolve(true)
        })
      })
    }

    if (this.isDevelopment) {
      await this.server.run()
      resolve(true)
    }
  })
}
