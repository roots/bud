import {BudInterface} from '../'
import {Loose} from '@roots/bud-framework'
import svgToMiniDataUri from 'mini-svg-data-uri'

/**
 * RuleSetLoaders
 */
const loaders = (bud: BudInterface): Loose => ({
  babel: {
    loader: bud.loaderModules.get('babel'),
    options: {
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            modules: false,
            forceAllTransforms: true,
          },
        ],
      ],

      plugins: [
        require.resolve('@babel/plugin-syntax-dynamic-import'),
        require.resolve(
          '@babel/plugin-proposal-object-rest-spread',
        ),
        [
          require.resolve('@babel/plugin-transform-runtime'),
          {
            helpers: false,
          },
        ],
      ],
    },
  },

  css: {
    loader: bud.loaderModules.get('css'),
    options: {
      importLoaders: 1,
    },
  },

  file: {
    loader: bud.loaderModules.get('file'),
    options: {
      name: '[path][name].[ext]',
    },
  },

  minicss: {
    loader: bud.loaderModules.get('minicss'),
    options: {
      hot: bud.features.enabled('hot'),
    },
  },

  raw: {
    loader: bud.loaderModules.get('raw'),
  },

  style: {
    loader: bud.loaderModules.get('style'),
  },

  svg: {
    loader: bud.loaderModules.get('url'),
    options: {
      generator: content => svgToMiniDataUri(content.toString()),
    },
  },

  postcss: {
    loader: bud.loaderModules.get('postcss'),
    options: {
      plugins: [require('autoprefixer')],
    },
  },

  resolveUrl: {
    loader: bud.loaderModules.get('resolveUrl'),
    options: {
      root: '',
      sourceMap: bud.features.enabled('sourceMap'),
    },
  },
})

export {loaders as default}
