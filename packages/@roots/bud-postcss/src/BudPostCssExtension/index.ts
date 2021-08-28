import {Item, Loader} from '@roots/bud-build'
import type {Module} from '@roots/bud-extensions'
import {pathExistsSync} from 'fs-extra'

import {PostCssConfig} from '../PostCssConfig'

interface BudPostCssExtension extends Module {
  api: {
    postcss: PostCssConfig
  }

  boot: Module.Boot
}

const BudPostCssExtension: BudPostCssExtension = {
  name: '@roots/bud-postcss',

  api: {
    postcss: new PostCssConfig(),
  },

  boot({build, path, postcss}) {
    build.loaders.postcss = new Loader(
      require.resolve('postcss-loader'),
    )

    build.items.postcss = new Item({
      loader: ({build}) => build.loaders.postcss,
      options: ({path, postcss}) => ({
        postcssOptions: {
          config: pathExistsSync(
            path('project', 'postcss.config.js'),
          ),
          plugins: Object.values(postcss.plugins),
        },
        sourceMap: true,
      }),
    })

    build.rules.css.setUse(({isProduction, build}) => [
      isProduction ? build.items.minicss : build.items.style,
      build.items.css,
      build.items.postcss,
    ])

    !pathExistsSync(path('project', 'postcss.config.js')) &&
      postcss.setPlugins({
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
  },
}

export {BudPostCssExtension}
