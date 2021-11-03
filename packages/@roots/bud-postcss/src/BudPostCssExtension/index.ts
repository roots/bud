import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import postcssPreset from 'postcss-preset-env'

import {PostCssConfig} from '../PostCssConfig'

export const BudPostCssExtension: Extension.Module = {
  name: '@roots/bud-postcss',

  mixin: async (app: Framework) => ({
    postcss: [PostCssConfig, app],
  }),

  register: (app: Framework) => {
    const {warn, project} = app

    app.build.loaders.postcss = new Loader(
      require.resolve('postcss-loader'),
    )

    app.build.items.postcss = new Item({
      loader: app.build.loaders.postcss,
      options: ({postcss}) => ({
        postcssOptions: {
          plugins: Object.values(postcss.plugins),
        },
        sourceMap: true,
      }),
    })

    app.build.rules.css.setUse(app => [
      app.isProduction
        ? app.build.items.minicss
        : app.build.items.style,
      app.build.items.css,
      app.build.items.postcss,
    ])

    const installed = project.getKeys('installed')
    const isInstalled = (plugin: string) =>
      installed.includes(plugin)

    isInstalled('postcss-import')
      ? app.postcss.setPlugin('postcss-import', postcssImport)
      : warn(`PostCSS plugin 'postcss-import' is not installed`)

    isInstalled('postcss-nested')
      ? app.postcss.setPlugin('postcss-nested', postcssNested)
      : warn(`PostCSS plugin 'postcss-nested' is not installed`)

    isInstalled('postcss-preset-env')
      ? app.postcss.setPlugin('postcss-preset-env', [
          postcssPreset,
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ])
      : warn(`PostCSS plugin 'postcss-nested' is not installed`)
  },
}
