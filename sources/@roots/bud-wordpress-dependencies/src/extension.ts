// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/bud-wordpress-dependencies-webpack-plugin`
 *
 * @see https://bud.js.org
 */

import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import EntrypointsWebpackPlugin from '@roots/entrypoints-webpack-plugin'
import {
  type Options,
  default as WordPressDependenciesWebpackPlugin,
} from '@roots/wordpress-dependencies-webpack-plugin'

@label(`@roots/bud-wordpress-dependencies`)
@plugin(WordPressDependenciesWebpackPlugin)
@options<Options>({
  emitWordPressJson: false,
  entrypointsPlugin: EntrypointsWebpackPlugin,
})
export default class BudWordPressDependencies extends Extension<
  Options,
  WordPressDependenciesWebpackPlugin
> {}
