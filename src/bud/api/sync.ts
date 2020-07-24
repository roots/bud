import type {Bud, Sync} from './Types'

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
const sync: Sync = function ({enabled, options}): Bud {
  this.state.features.browserSync =
    enabled || !this.inProduction
  this.state.options.browserSync = {
    host: options.host ? options.host : 'localhost',
    port: options.port ? options.port : 3000,
    proxy: options.proxy ? options.proxy : null,
  }

  return this
}

export {sync}
