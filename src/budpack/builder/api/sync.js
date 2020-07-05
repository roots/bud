import {inProduction} from './../mode'

/**
 * Make API: sync
 *
 * @type   {func.<makeSync>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeSync = bud => {
  /**
   * Configure BrowserSync live reload.
   *
   * @typedef  {func.<sync>} sync
   * @param    {string}  [host='localhost']
   * @param    {number}  [port=3000]
   * @param    {boolean} [enabled=!bud.inProduction]
   * @param    {string}  [proxy='']
   * @return   {object.<bud>} bud instance
   */
  const sync = ({enabled = !inProduction, proxy, port, host}) => {
    bud.features.browserSync = enabled

    bud.options.browserSync = {
      host: host ? host : 'localhost',
      port: port ? port : 3000,
      proxy: proxy ? proxy : null,
    }

    return bud
  }

  return sync
}

export {makeSync}
