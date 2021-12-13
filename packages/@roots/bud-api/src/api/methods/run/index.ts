import type {Framework} from '@roots/bud-framework'

export interface run {
  (): Promise<void>
}

export const run: run = async function (): Promise<void> {
  const ctx = this as Framework

  await ctx.extensions.processQueue()
  await ctx.api.processQueue()

  await ctx.hooks.filterAsync<'event.run'>(
    'event.run',
    async () => ctx,
  )

  const isDev =
    ctx.isDevelopment &&
    ctx.server?.run &&
    ctx.store.is('server.middleware.hot', true)

  const development = async () => {
    await ctx.server.run()
  }

  const production = async () => {
    const compiler = await ctx.compiler.compile()
    compiler.run(ctx.compiler.callback)
  }

  isDev ? await development() : await production()
}
