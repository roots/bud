// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/wordpress-dependencies-webpack-plugin` adapter
 *
 * @see https://bud.js.org
 */

import {Extension} from '@roots/bud-framework/extension'
import {label, plugin} from '@roots/bud-framework/extension/decorators'
import WordPressDependenciesWebpackPlugin from '@roots/wordpress-dependencies-webpack-plugin'

@label(`@roots/bud-wordpress-dependencies`)
@plugin(WordPressDependenciesWebpackPlugin)
export default class BudWordPressDependencies extends Extension<
  null,
  WordPressDependenciesWebpackPlugin
> {}
