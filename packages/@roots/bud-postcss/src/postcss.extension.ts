import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'

import {PostCssConfig} from './bud.postcss'

export const BudPostCssExtension: Extension.Module = {
  name: '@roots/bud-postcss',

  mixin: async (app: Framework) => ({
    postcss: [PostCssConfig, app],
  }),

  register: (app: Framework) => {
    app.build.loaders.postcss = new Loader(
      require.resolve('postcss-loader'),
    )

    app.build.items.postcss = new Item({
      loader: app.build.loaders.postcss,
      options: ({postcss}) => {
        return {
          postcssOptions: {
            plugins: postcss.getValues(),
          },
          sourceMap: true,
        }
      },
    })

    app.build.rules.css.use = app => [
      app.isProduction
        ? app.build.items.minicss
        : app.build.items.style,
      app.build.items.css,
      app.build.items.postcss,
    ]

    app.postcss.setPlugin('postcss-import', [
      require.resolve('postcss-import'),
    ])

    app.postcss.setPlugin('postcss-nested', [
      require.resolve('postcss-nested'),
    ])

    app.postcss.setPlugin('postcss-preset-env', [
      require.resolve('postcss-preset-env'),
      {
        stage: 1,
        features: {
          'focus-within-pseudo-class': false,
        },
      },
    ])
  },
}
