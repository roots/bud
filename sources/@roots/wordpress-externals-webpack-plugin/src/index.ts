// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Externalizes dependencies which should be enqueued through WordPress' API
 *
 * @see https://github.com/roots/bud/tree/stable/src/wordpress-externals-webpack-plugin
 */

export interface Options {
  exclude?: string[]
}

export {WordPressExternalsWebpackPlugin as default} from '@roots/wordpress-externals-webpack-plugin/plugin'
