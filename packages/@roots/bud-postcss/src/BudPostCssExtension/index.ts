import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'
import {safeRequire} from '@roots/bud-support'
import {pathExistsSync} from 'fs-extra'

import {PostCssConfig} from '../PostCssConfig'

export interface BudPostCssExtension extends Extension.Module {
  name: Extension.Module['name'] & '@roots/bud-postcss'

  api: Extension.Module['api'] & {
    postcss: PostCssConfig
  }

  boot: Extension.Module['boot']
}

export const BudPostCssExtension: BudPostCssExtension = {
  name: '@roots/bud-postcss',

  api: {
    postcss: new PostCssConfig(),
  },

  boot: function ({build, path, postcss}) {
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
        'postcss-import': safeRequire('postcss-import'),
        'postcss-nested': safeRequire('postcss-nested'),
        'postcss-preset-env': [
          safeRequire('postcss-preset-env'),
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
