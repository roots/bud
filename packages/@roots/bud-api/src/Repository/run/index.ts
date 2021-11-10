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
    this.root.store.is('server.middleware.hot', true)

  const dev = async () => {
    this.server.inject()
    await this.server.run()
  }

  const prod = async () => {
    const compiler = await this.compiler.compile()
    compiler.run(this.compiler.callback)
  }

  isDev ? await dev() : await prod()
}
