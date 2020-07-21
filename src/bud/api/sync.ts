/**
 * ## bud.sync
 *
 * Configure BrowserSync.
 *
 * ```js
 * bud.sync({
 *   enabled: !bud.inProduction,
 *   proxy: 'http://bud.test',
 *   host: 'localhost',
 *   port: 3000,
 * })
 * ```
 */
const sync = function (options): bud {
  this.features.browserSync = options.enabled
    ? options.enabled
    : !this.inProduction
  this.options.browserSync = {
    host: options.host ? options.host : 'localhost',
    port: options.port ? options.port : 3000,
    proxy: options.proxy ? options.proxy : null,
  }

  return this
}

export {sync}
import type {bud} from './..'
