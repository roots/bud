// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/bud-wordpress-dependencies-webpack-plugin`
 *
 * @see https://bud.js.org
 */

import {Extension, type Option} from '@roots/bud-framework/extension'
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
  exclude: [],
})
export default class BudWordPressDependencies extends Extension<
  Options,
  WordPressDependenciesWebpackPlugin
> {
  public declare exclude: Option<
    BudWordPressDependencies,
    Options,
    `exclude`
  >[`value`]
  public declare getExclude: Option<
    BudWordPressDependencies,
    Options,
    `exclude`
  >[`get`]
  public declare setExclude: Option<
    BudWordPressDependencies,
    Options,
    `exclude`
  >[`set`]

  public declare emitWordPressJson: Option<
    BudWordPressDependencies,
    Options,
    `emitWordPressJson`
  >[`value`]
  public declare getEmitWordPressJson: Option<
    BudWordPressDependencies,
    Options,
    `emitWordPressJson`
  >[`get`]
  public declare setEmitWordPressJson: Option<
    BudWordPressDependencies,
    Options,
    `emitWordPressJson`
  >[`set`]

  public declare entrypointsPlugin: Option<
    BudWordPressDependencies,
    Options,
    `entrypointsPlugin`
  >[`value`]
  public declare getEntrypointsPlugin: Option<
    BudWordPressDependencies,
    Options,
    `entrypointsPlugin`
  >[`set`]
  public declare setEntrypointsPlugin: Option<
    BudWordPressDependencies,
    Options,
    `entrypointsPlugin`
  >[`get`]
}
