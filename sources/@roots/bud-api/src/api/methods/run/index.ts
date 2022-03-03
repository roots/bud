import type {Framework} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'

export const {ensureDirSync, pathExistsSync} = fs

export interface run {
  (): Promise<void>
}

export const run: run = async function (): Promise<void> {
  const ctx = this as Framework

  await ctx.hooks.fire('event.run')

  const production = async () => {
    const compiler = await ctx.compiler.compile()
    compiler.run(ctx.compiler.callback)
  }

  try {
    ctx.isDevelopment ? await ctx.server.run() : await production()
  } catch (error) {
    ctx.error(error)
  }
}
