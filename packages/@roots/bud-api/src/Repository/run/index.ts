import type {Framework} from '@roots/bud-framework'

export interface run {
  (this: Framework): Promise<void>
}

/**
 * Run the build
 *
 * @example
 * ```js
 * bud.run()
 * ```
 *
 * @public @config
 */
export const run: run = async function (): Promise<void> {
  this.hooks.filter('run', this)

  const isDev =
    this.isDevelopment &&
    this.server?.run &&
    this.server?.config.isTrue('middleware.hot')

  const dev = () => {
    this.server?.inject()
    this.server?.run()
  }

  const prod = async () => {
    const compiler = await this.compiler.compile()
    compiler.run(this.compiler.callback)
  }

  if (isDev) {
    dev()
  } else await prod()
}
