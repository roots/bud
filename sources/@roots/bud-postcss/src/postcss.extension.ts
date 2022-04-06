import {Module} from '@roots/bud-framework/types/services/extensions/extension'

import {PostCssConfig} from './bud.postcss'

export const BudPostCssExtension: Module = {
  name: '@roots/bud-postcss',

  mixin: async () => ({
    postcss: [PostCssConfig],
  }),

  register: async (app, logger) => {
    app.build
      .setLoader('postcss', require.resolve('postcss-loader'))
      .setItem('postcss', item =>
        item.setLoader(`postcss`).setOptions(({postcss}) => ({
          postcssOptions: {
            ...(app.extensions.get('@roots/bud-postcss').options.all() ??
              {}),
            ...(postcss.getValues() ? {plugins: postcss.getValues()} : {}),
          },
          sourceMap: true,
        })),
      )

    app.build.rules.css.setUse([`precss`, `css`, `postcss`])

    try {
      logger.await('resolving postcss plugins')

      app.postcss.setPlugins({
        'postcss-import': [require.resolve('postcss-import')],
        'postcss-nested': [require.resolve('postcss-nested')],
        'postcss-preset-env': [
          require.resolve('postcss-preset-env'),
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ],
      })

      logger.success('resolving postcss plugins')
    } catch (e) {
      app.error(e)
    }
  },
}
