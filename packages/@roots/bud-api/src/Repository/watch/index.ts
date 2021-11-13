import type {Framework, Server} from '@roots/bud-framework'
import chalk from 'chalk'

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
  this.root as Framework
  this.root.api.log('success', {
    message: `watch files added`,
    suffix: chalk.dim(files.join(', ')),
  })

  if (!this.root.isDevelopment || !this.root.server) {
    this.root.api.log('info', {
      message: 'skipping watch files',
      suffix: 'production mode is set',
    })
    return this.root
  }

  files && this.root.store.set('server.watch.files', files)

  return this
}
