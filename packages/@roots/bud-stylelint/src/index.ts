/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * Add stylelint support to Bud projects
 *
 * @export {name} The name of the extension
 * @export {options} The extension options
 * @export {make} The webpack plugin factory
 *
 * @author Kelly Mears <kelly@roots.io>
 * @license MIT
 *
 * @packageDocumentation
 */

import type {
  Framework,
  WebpackPlugin,
} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import StylelintWebpackPlugin, {
  Options,
} from 'stylelint-webpack-plugin'
import type {WebpackPluginInstance} from 'webpack'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      'stylelint-webpack-plugin': BudStylelintWebpackPlugin
    }
  }
}

interface BudStylelintWebpackPlugin
  extends WebpackPlugin<StylelintWebpackPlugin, Options> {
  name: 'stylelint-webpack-plugin' & WebpackPlugin['name']
  options(app: Framework): WebpackPlugin['options'] & Options
  make(
    options: Container<Options>,
  ): WebpackPluginInstance & StylelintWebpackPlugin
}

const BudStylelintWebpackPlugin: BudStylelintWebpackPlugin = {
  name: 'stylelint-webpack-plugin',

  options: app => ({
    context: app.path('src'),
  }),

  make: opts => new StylelintWebpackPlugin(opts.all()),
}

export const {name, options, make} = BudStylelintWebpackPlugin
