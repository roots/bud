import type {Bud} from '../bud.js'

/**
 * Run the build
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud): Promise<void> {
  if (this.isProduction) {
      await this.compiler.compile().then(compilation =>
      compilation?.run((error, stats) => {
        if (error) {
          this.error(`Compiler error\n`, error.message, `\n`)
          throw new Error()
        }

        compilation.close(error => {
          if (error) {
            this.error(`Compiler error\n`, error.message, `\n`)
            throw new Error()
          }
        })
      }),
    )
  }

  if (this.isDevelopment) {
    await this.server.run()
  }
}
