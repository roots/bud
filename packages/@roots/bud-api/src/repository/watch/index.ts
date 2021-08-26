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
interface watch {
  (
    files: Server.Configuration['watch']['files'],
    options?: Server.Configuration['watch']['options'],
  ): Framework
}

const watch: watch = function (files, options) {
  const target = this.isChild ? this.parent : this

  if (!target.isDevelopment || !target.server) {
    target.log('Skipping watched files in production')
    return this
  }

  files && this.server.config.set('watch.files', files)
  options && this.server.config.set('watch.options', options)

  return this
}

export {watch}
