import type {Framework} from '@roots/bud-framework'

export interface run {
  (): Promise<void>
}

export const run: run = async function (): Promise<void> {
  this as Framework

  await this.extensions.processQueue()
  await this.api.processQueue()

  this.hooks.promised('run', this)

  const isDev =
    this.isDevelopment &&
    this.server?.run &&
    this.store.is('server.middleware.hot', true)

  const development = async () => {
    this.server.inject()
    await this.server.run()
  }

  const production = async () => {
    const compiler = await this.compiler.compile()
    compiler.run(this.compiler.callback)
  }

  isDev ? await development() : await production()
}
