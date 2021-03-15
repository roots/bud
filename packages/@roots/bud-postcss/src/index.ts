import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {PostCssConfig} from './api'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-postcss'

/**
 * Extension dependencies
 */
export const devDependencies: Module['devDependencies'] = [
  'postcss',
]

/**
 * Extension config
 */
export const api: Module['api'] = (app: Framework) => ({
  postcss: new PostCssConfig({app}),
})

/**
 * Topics
 */
export const topics: Module['topics'] = [
  'item/postcss',
  'item/postcss/loader',
  'item/postcss/options',
  'item/postcss/sourceMap',
  'item/postcss/postcssOptions',
  'item/postcss/plugins',
  'item/postcss/config',
]

/**
 * Publishes
 */
export const publish: Module['publish'] = (app: Framework) => ({
  /**
   * item/postcss
   */
  'item/postcss': () => ({
    loader: app.subscribe('item/postcss/loader'),
    options: app.subscribe('item/postcss/options'),
  }),
  'item/postcss/loader': () => require.resolve('postcss-loader'),
  'item/postcss/options': () => ({
    postcssOptions: app.subscribe('item/postcss/postcssOptions'),
    sourceMap: app.subscribe('item/postcss/sourceMap'),
  }),
  'item/postcss/sourceMap': () => true,
  'item/postcss/postcssOptions': () => ({
    config: app.subscribe('item/postcss/config'),
    plugins: app.subscribe('item/postcss/plugins'),
  }),
  'item/postcss/config': () => app.postcss.hasProjectConfig,
  'item/postcss/plugins': () => {
    return app.postcss.enabled.map(enabled => {
      const [plugin, options] = app.postcss.plugins[enabled]
      return require(plugin)(options)
    })
  },

  /**
   * rule/css
   */
  'rule/css/use': use => [
    ...use.splice(0, 2),
    app.subscribe('item/postcss'),
    ...use,
  ],
})

/**
 * Replace default css implementation
 */
export const boot: Module['boot'] = (app: Framework) => {
  !app.postcss.hasProjectConfig &&
    app.sequence([
      app =>
        app.postcss.log.info(
          'No project config found. Enabling defaults.',
        ),

      app =>
        app.postcss
          .setPlugin('postcss-nested')
          .setPlugin('postcss-custom-properties')
          .setPlugin([
            'postcss-import',
            {path: app.subscribe('build/resolve/modules')},
          ])
          .enable([
            'postcss-import',
            'postcss-nested',
            'postcss-custom-properties',
          ]),
    ])
}
