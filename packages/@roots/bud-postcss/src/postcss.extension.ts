import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'

import {PostCssConfig} from './bud.postcss'

const ensureDependencies = async function (this: Framework) {
  try {
    await import('postcss')
    this.success('postcss is installed')
    return true
  } catch (e) {
    this.error(e)
    return
  }
}

export const BudPostCssExtension: Extension.Module = {
  name: '@roots/bud-postcss',

  mixin: async () => ({
    postcss: [PostCssConfig],
  }),

  register: async (app: Framework) => {
    const log = app.logger.scoped('@roots/bud-postcss')

    const postcssLoaded = await ensureDependencies.bind(app)()
    if (!postcssLoaded) return

    app.build.loaders.postcss = new Loader(
      require.resolve('postcss-loader'),
    )

    app.build.items.postcss = new Item({
      loader: app.build.loaders.postcss,
      options: ({postcss}) => {
        return {
          postcssOptions: {
            ...(app.hooks.filter(
              'extension.@roots/bud-postcss.options',
              {},
            ) ?? {}),
            plugins: [...(postcss.getValues() ?? [])],
          },
          sourceMap: true,
        }
      },
    })

    app.build.rules.css.setUse(app => [
      app.isProduction
        ? app.build.items.minicss
        : app.build.items.style,
      app.build.items.css,
      app.build.items.postcss,
    ])

    try {
      log.await('resolving postcss plugins')
      app.postcss.setPlugins({
        'postcss-import': require.resolve('postcss-import'),
        'postcss-nested': require.resolve('postcss-nested'),
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
      log.success('resolving postcss plugins')
    } catch (e) {
      app.error(e)
    }
  },
}
