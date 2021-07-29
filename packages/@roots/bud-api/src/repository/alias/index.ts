/**
 * @module @roots/bud-api
 */

import {resolve} from 'path'
import type Webpack from 'webpack'

import type {Repository} from '../'

/**
 * @function alias
 */
const alias: Repository.Alias = function (alias) {
  this.hooks.on(
    'build/resolve/alias',
    (aliases: Webpack.Configuration['resolve']['alias']) => ({
      ...aliases,
      ...Object.entries(alias).reduce(
        (a, [k, v]: [string, string]) => ({
          ...a,
          [k]: resolve(v),
        }),
        {},
      ),
    }),
  )

  return this
}

/**
 * @exports alias
 */
export {alias}
