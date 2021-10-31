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
  const target = this.isChild ? this.parent : this

  if (!target.isDevelopment || !target.server) {
    target.warn('Skipping watched files in production')
    return this
  }

  files && this.server.config.set('watch.files', files)

  return this
}
