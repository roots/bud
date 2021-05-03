import './interface'

import {Framework, Module} from '@roots/bud-framework'
import {PostCssConfig} from './api'

const extension: Module = {
  name: '@roots/bud-postcss',
  api: app => ({
    postcss: new PostCssConfig({app}),
  }),
  boot: (app: Framework) => {
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
  },
  publish: (app: Framework) => ({
    'loader/postcss': () => require.resolve('postcss-loader'),

    'item/postcss': () => ({
      loader: app.hooks.filter('item/postcss/loader'),
      options: app.hooks.filter('item/postcss/options'),
    }),

    'item/postcss/loader': () =>
      app.hooks.filter('loader/postcss'),

    'item/postcss/options': () => ({
      postcssOptions: app.hooks.filter(
        'item/postcss/options/postcssOptions',
      ),
      sourceMap: app.hooks.filter(
        'item/postcss/options/sourceMap',
      ),
    }),
    'item/postcss/options/sourceMap': () => true,
    'item/postcss/options/postcssOptions': () => ({
      config: app.hooks.filter(
        'item/postcss/options/postcssOptions/config',
      ),
      plugins: app.hooks.filter(
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
        app.hooks.filter('item/postcss'),
        // The rest of the loaders
        ...use,
      ]
    },
  }),
}

export const {
  name,
  devDependencies,
  publish,
  boot,
  api,
} = extension
