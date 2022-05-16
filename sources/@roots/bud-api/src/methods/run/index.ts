import type {Bud} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'

export const {ensureDirSync, pathExistsSync} = fs

export interface run {
  (): Promise<void>
}

export interface facade {
  (): void
}

export const run: run = async function (): Promise<void> {
  const app = this as Bud

  await app.hooks.fire('event.run')

  const production = async () => {
    const compiler = await app.compiler.compile()
    compiler.run(app.compiler.callback)
  }

  try {
    app.isDevelopment ? await app.server.run() : await production()
  } catch (error) {
    app.error(error)
  }
}
