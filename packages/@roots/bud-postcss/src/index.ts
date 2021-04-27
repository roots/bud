import './interface'

import {Framework, Module} from '@roots/bud-framework'
import {PostCssConfig} from './api'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-postcss'

/**
 * Register devDependencies
 */
export const devDependencies: Module['devDependencies'] = [
  'postcss',
]

/**
 * Register app.postcss
 */
export const api: Module['api'] = (app: Framework) => ({
  postcss: new PostCssConfig({app}),
})

/**
 * Publishes
 */
export const publish: Module['publish'] = (app: Framework) => ({
  /**
   * loader/postcss
   */
  'loader/postcss': () => require.resolve('postcss-loader'),

  /**
   * item/postcss
   */
  'item/postcss': () => ({
    loader: app.subscribe('item/postcss/loader'),
    options: app.subscribe('item/postcss/options'),
  }),

  // loader
  'item/postcss/loader': () => app.subscribe('loader/postcss'),

  // options
  'item/postcss/options': () => ({
    postcssOptions: app.subscribe(
      'item/postcss/options/postcssOptions',
    ),
    sourceMap: app.subscribe('item/postcss/options/sourceMap'),
  }),

  // options/sourceMap
  'item/postcss/options/sourceMap': () => true,

  // options.postcssOptions
  'item/postcss/options/postcssOptions': () => ({
    config: app.subscribe(
      'item/postcss/options/postcssOptions/config',
    ),
    plugins: app.subscribe(
      'item/postcss/options/postcssOptions/plugins',
    ),
  }),

  // options.config
  'item/postcss/options/postcssOptions/config':
    app.postcss.hasProjectConfig,

  // options.plugins
  'item/postcss/options/postcssOptions/plugins':
    app.postcss.makeConfig,

  /**
   * rule/css
   */
  'rule/css/use': use => {
    return [
      /**
       * Assuming postcss should be the third item
       * in the ruleset (after minicss/style and css loaders)
       */
      ...use.splice(0, 2),
      app.subscribe('item/postcss'),
      // The rest of the loaders
      ...use,
    ]
  },
})

/**
 * Replace default css implementation
 */
export const boot: Module['boot'] = (app: Framework) => {
  !app.postcss.hasProjectConfig &&
    app.sequence([
      app =>
        app.postcss.logger.log(
          'No project config found. Enabling defaults.',
        ),

      app =>
        app.postcss
          .set('postcss-import')
          .set('postcss-nested')
          .set('postcss-custom-properties'),
    ])
}
