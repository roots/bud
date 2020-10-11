import * as Plugin from '@wordpress/dependency-extraction-webpack-plugin'

/**
 * Simple options storage.
 *
 * Alternatively, you may register options in a bud.store
 * or make a new container/store if you need to access options
 * outside of this plugin's scope.
 */
export const options = {}

/**
 * Init is called early and should be
 * where you handle most of your setup.
 *
 * It's passed a couple utility methods to help.
 */
export const init = (build, api): void => {
  /**
   * Build is a {Webpack.Plugin} registration utility.
   *
   * @params
   *  - @handle {string}
   *  - @callback - @return {Webpack.Plugin}
   */
  build('dependencyExtraction', plugin)

  /**
   * Api
   *
   * Bud config function registration utility
   *
   * @example bud.customMethod(...args)
   *
   * @params
   *  - @handle
   *  - @callback - @return @function (this: Bud, ...args): Bud
   */
  api('dependencyExtraction', config)
}

/**
 * @note
 *   this doesn't require arrow syntax, but we're leveraging
 *   hoisting here. If declaring as a const, move this function
 *   above the export.
 */
function plugin(bud: Framework.Bud) {
  return Plugin(options)
}

/**
 * @note
 *   must not use arrow syntax. it has a `this` context (bud).
 */
function config(opts?) {
  if (opts) {
    options = opts
  }

  return this
}
