import type {Framework} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'

export const {ensureDirSync, pathExistsSync} = fs

export interface run {
  (): Promise<void>
}

export const run: run = async function (): Promise<void> {
  const ctx = this as Framework

  await ctx.extensions.processQueue()
  await ctx.api.processQueue()

  await ctx.hooks.filterAsync('event.run', async () => ctx)

  const isDev = ctx.isDevelopment && ctx.hooks.filter('middleware.enabled')

  const development = async () => {
    await ctx.server.run()
  }

  const production = async () => {
    const compiler = await ctx.compiler.compile()
    compiler.run(ctx.compiler.callback)
  }

  isDev ? await development() : await production()
}
