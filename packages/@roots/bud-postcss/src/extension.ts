import {Item, Loader} from '@roots/bud-build'
import {Module} from '@roots/bud-framework'
import {pathExistsSync} from 'fs-extra'

import {Config} from './Config'

const extension: Module = {
  name: '@roots/bud-postcss',

  api: {
    postcss: new Config(),
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

export const {name, api, boot} = extension
