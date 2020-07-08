import {inProduction} from './../mode'

/**
 * Configure BrowserSync.
 * @example
 * bud.sync({
 *   enabled: !bud.inProduction,
 *   proxy: 'http://bud.test',
 *   host: 'localhost',
 *   port: 3000,
 * })
 * @typedef {function ({enabled: {boolean}, proxy: {string}, port: {number}, host: {string}}) => {bud: typeof import('./../index')}} sync
 * @param   {{enabled: {boolean}, proxy: {string}, port: {number}, host: {string}}} options - browserSync options
 * @param   {boolean=} options.enabled - true to enable (default: !bud.inProduction)
 * @param   {string=}  options.proxy - live reload proxy (default: null)
 * @param   {number=}  options.port - live reload port (default: 3000)
 * @param   {string=}  options.host - live reload host (default: 'localhost')
 * @return  {typeof import('./../index')} bud
 */
const sync = function (options) {
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
