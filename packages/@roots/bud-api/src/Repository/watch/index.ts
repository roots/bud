import type {Framework, Server} from '@roots/bud-framework'

/**
 * Configure the list of files that, when modified,
 * will force the browser to reload (even in hot mode).
 *
 * @example
 * ```js
 * app.watch(['templates/*.html'])
 * ```
 */
export interface watch {
  (files: Server.Configuration['watch']['files']): Framework
}

export const watch: watch = function (files) {
  const ctx = this.root as Framework

  if (!ctx.isDevelopment || !ctx.server) {
    ctx.warn('Skipping watched files in production')
    return ctx
  }

  files && ctx.root.store.set('server.watch.files', files)

  return ctx
}
