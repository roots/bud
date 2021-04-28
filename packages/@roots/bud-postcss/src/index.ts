import './interface'

import {Framework, Module} from '@roots/bud-framework'
import {PostCssConfig} from './api'

export const name: Module['name'] = '@roots/bud-postcss'

export const devDependencies: Module['devDependencies'] = [
  'postcss',
]

export const api: Module['api'] = (app: Framework) => ({
  postcss: new PostCssConfig({app}),
})

export const publish: Module['publish'] = (app: Framework) => ({
  'loader/postcss': () => require.resolve('postcss-loader'),

  'item/postcss': () => ({
    loader: app.subscribe('item/postcss/loader'),
    options: app.subscribe('item/postcss/options'),
  }),

  'item/postcss/loader': () => app.subscribe('loader/postcss'),

  'item/postcss/options': () => ({
    postcssOptions: app.subscribe(
      'item/postcss/options/postcssOptions',
    ),
    sourceMap: app.subscribe('item/postcss/options/sourceMap'),
  }),

  'item/postcss/options/sourceMap': () => true,

  'item/postcss/options/postcssOptions': () => ({
    config: app.subscribe(
      'item/postcss/options/postcssOptions/config',
    ),
    plugins: app.subscribe(
      'item/postcss/options/postcssOptions/plugins',
    ),
  }),

  'item/postcss/options/postcssOptions/config':
    app.postcss.hasProjectConfig,

  'item/postcss/options/postcssOptions/plugins':
    app.postcss.makeConfig,

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
