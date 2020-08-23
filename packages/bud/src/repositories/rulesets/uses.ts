import {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-typings'
import type {RepositoryDefinition} from '../../container'

/**
 * Module Rule
 */
type Use = (bud: Bud) => WebpackRule

const uses: RepositoryDefinition = {
  name: 'uses',
  register: {
    babel: (bud: Bud) =>
      bud.hooks.filter('webpack.module.babel', {
        loader: bud.hooks.filter(
          'webpack.module.babel.loader',
          bud.loaders.get('babel'),
        ),
        options: bud.hooks.filter('webpack.module.babel.options', {
          cacheDirectory: bud.hooks.filter(
            'webpack.module.babel.options.cacheDirectory',
            true,
          ),
          cacheCompression: bud.hooks.filter(
            'webpack.module.babel.options.cacheCompression',
            true,
          ),
          ...bud.options.get('babel'),
        }),
      }),

    file: (bud: Bud) => ({
      loader: bud.loaders.get('file'),
      options: {
        name: '[path][name].[ext]',
      },
    }),

    miniCss: (bud: Bud) =>
      bud.hooks.filter('webpack.modules.miniCss', {
        loader: bud.hooks.filter(
          'webpack.modules.miniCss.loader',
          bud.loaders.get('miniCss'),
        ),
        options: bud.hooks.filter('webpack.modules.miniCss.options', {
          hot: bud.hooks.filter(
            'webpack.modules.miniCss.loader.hot',
            bud.features.enabled('hot'),
          ),
        }),
      }),

    css: (bud: Bud) =>
      bud.hooks.filter('webpack.modules.css', {
        loader: bud.hooks.filter(
          'webpack.modules.css.loader',
          bud.loaders.get('css'),
        ),
      }),

    resolveUrl: (bud: Bud) =>
      bud.hooks.filter('webpack.modules.resolveurl', {
        loader: bud.hooks.filter(
          'webpack.modules.resolveurl.loader',
          bud.loaders.get('resolveUrl'),
        ),
        options: bud.hooks.filter(
          'webpack.module.resolveurl.options',
          {
            sourceMap: bud.features.enabled('sourceMap'),
            debug: true,
          },
        ),
      }),

    postCss: (bud: Bud) =>
      bud.hooks.filter('webpack.module.postcss', {
        loader: bud.hooks.filter(
          'webpack.module.postcss.loader',
          bud.loaders.get('postCss'),
        ),
        options: bud.hooks.filter('webpack.module.postcss.options', {
          ident: bud.hooks.filter(
            'webpack.module.postcss.options.ident',
            'postcss',
          ),
          ...bud.options.get('postcss'),
        }),
      }),

    style: (bud: Bud) =>
      bud.hooks.filter('webpack.module.style', {
        loader: bud.hooks.filter(
          'webpack.module.style.loader',
          bud.loaders.get('style'),
        ),
      }),
  },
}

export {uses}
export {Use}
