import type {Bud} from '../bud.js'

/**
 * Run the build
 *
 * @public
 */
export interface run {
  (): Promise<void>
}

export const run: run = async function (this: Bud): Promise<void> {
  if (this.isProduction) {
    return await this.compiler.compile().then(compilation =>
      compilation?.run((error, stats) => {
        if (error) throw error.message
        if (this.isProduction)
          compilation.close(error => {
            if (error) throw error.message
          })
      }),
    )
  }

  await this.server.run()
}
