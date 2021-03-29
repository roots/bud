import {Framework} from '@roots/bud-framework'
import svgToMiniDataUri from 'mini-svg-data-uri'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * Item hooks
 */
export function items(app: Framework): void {
  app.publish(
    {
      /**
       * Loaders
       */
      'loader/css': () => require.resolve('css-loader'),
      'loader/cache': () => require.resolve('cache-loader'),
      'loader/file': () => require.resolve('file-loader'),
      'loader/raw': () => require.resolve('raw-loader'),
      'loader/minicss': () => MiniCssExtractPlugin.loader,
      'loader/url': () => require.resolve('url-loader'),
      'loader/resolve-url': () =>
        require.resolve('resolve-url-loader'),
      'loader/style': () => require.resolve('style-loader'),
      'loader/thread': () => require.resolve('thread-loader'),

      /**
       * item/css
       */
      'item/css': () => ({
        loader: app.subscribe('item/css/loader'),
        options: app.subscribe('item/css/options'),
      }),

      'item/css/loader': () => app.subscribe('loader/css'),

      'item/css/options': () => ({
        sourceMap: app.subscribe('item/css/options/sourceMap'),
      }),

      'item/css/options/sourceMap': () =>
        !app.store.isFalse('options.devtool'),

      /**
       * item/cache
       */
      'item/cache': () => ({
        loader: app.subscribe('item/cache/loader'),
        options: app.subscribe('item/cache/options'),
      }),

      'item/cache/loader': () => app.subscribe('loader/cache'),

      'item/cache/options': () => ({
        cacheDirectory: app.subscribe(
          'item/cache/options/cacheDirectory',
        ),
      }),

      'item/cache/options/cacheDirectory': () =>
        app.project(app.subscribe('location/storage')),

      /**
       * item/file
       */
      'item/file': () => ({
        loader: app.subscribe('item/file/loader'),
        options: app.subscribe('item/file/options'),
      }),

      'item/file/loader': () => app.subscribe('loader/file'),

      'item/file/options': () => ({
        name: app.subscribe('item/file/options/name'),
      }),

      'item/file/options/name': () =>
        (app.store.isTrue('options.hash')
          ? app.store.get('options.hashFormat')
          : app.store.get('options.fileFormat')
        ).concat('.[ext]'),

      /**
       * item/resolve-url
       */
      'item/resolve-url': () => ({
        loader: app.subscribe('item/resolve-url/loader'),
        options: app.subscribe('item/resolve-url/options'),
      }),

      'item/resolve-url/loader': () =>
        app.subscribe('loader/resolve-url'),

      'item/resolve-url/options': () => ({
        root: app.subscribe('location/src') ?? false,
        sourceMap: app.subscribe(
          'item/resolve-url/options/sourceMap',
        ),
      }),

      'item/resolve-url/options/sourceMap': () =>
        !app.store.isFalse('options.devtool'),

      /**
       * item/raw
       */
      'item/raw': () => ({
        loader: app.subscribe('item/raw/loader'),
      }),

      'item/raw/loader': () => app.subscribe('loader/raw'),

      /**
       * item/style
       */
      'item/style': () => ({
        loader: app.subscribe('item/style/loader'),
      }),
      'item/style/loader': () => app.subscribe('loader/style'),

      /**
       * item/svg
       */
      'item/svg': () => ({
        loader: app.subscribe('item/svg/loader'),
        options: app.subscribe('item/svg/options'),
      }),

      'item/svg/loader': () => app.subscribe('loader/url'),

      'item/svg/options': () => ({
        name: app.subscribe('item/svg/options/name'),
        generator: (content: unknown) =>
          svgToMiniDataUri(content.toString()),
      }),

      'item/svg/options/name': () =>
        (app.store.isTrue('options.hash')
          ? app.store.get('options.hashFormat')
          : app.store.get('options.fileFormat')
        ).concat('.[ext]'),

      /**
       * item/thread
       */
      'item/thread': () => ({
        loader: app.subscribe('loader/thread'),
      }),

      /**
       * item/minicss
       */
      'item/minicss': () => ({
        loader: app.subscribe('item/minicss/loader'),
        options: app.subscribe('item/minicss/options'),
      }),

      'item/minicss/loader': () =>
        app.subscribe('loader/minicss'),

      'item/minicss/options': () => ({
        publicPath: app.subscribe(
          'item/minicss/options/publicPath',
        ),
      }),

      'item/minicss/options/publicPath': () =>
        app.subscribe('location/publicPath'),
    },
    'providers/item',
  )
}
