import {Item, Loader} from '@roots/bud-build'
import {Module} from '@roots/bud-framework'
import {pathExistsSync} from 'fs-extra'

import PostCssConfig from './Config'

interface postcss extends Module {
  name: '@roots/bud-postcss'
  api: {
    postcss: PostCssConfig
  }
  boot: Module.Boot
}

const postcss: postcss = {
  name: '@roots/bud-postcss',

  api: {
    postcss: new PostCssConfig(),
  },

  boot: ({build, path, postcss}) => {
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
          plugins: Object.values(postcss.plugins).map(
            ([plugin, options]) => plugin(options),
          ),
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
      postcss.setPlugins([
        'postcss-import',
        'postcss-nested',
        [
          'postcss-preset-env',
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ],
      ])
  },
}

export default postcss
