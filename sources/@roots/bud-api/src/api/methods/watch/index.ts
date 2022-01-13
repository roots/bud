import type {Framework, Server} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

export interface watch {
  (files: Server.Configuration['watch']['files']): Framework
}

export const watch: watch = function (files) {
  const ctx = (this.root as Framework) ?? (this as Framework)

  if (!ctx.isDevelopment) {
    ctx.api.log('log', {
      message: 'skipping watch files',
      suffix: 'production mode is set',
    })
    return ctx
  }

  ctx.store.set(
    'server.watch.files',
    Array.isArray(files) ? files : [files],
  )

  ctx.api.log('success', {
    message: `watch files added`,
    suffix: chalk.dim(files.join(', ')),
  })

  return ctx
}
