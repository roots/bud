import {Item} from '../Item'

/**
 * Items
 *
 * @public
 */
export default {
  /**
   * .css handler factory
   *
   * @public
   */
  css: () =>
    new Item({
      loader: ({build}) => build.loaders.css,
      options: ({hooks}) => ({
        importLoaders: 1,
        sourceMap: hooks.filter('build.devtool') ? true : false,
      }),
    }),

  /**
   * .css handler factory
   *
   * @public
   */
  cssModule: () =>
    new Item({
      loader: ({build}) => build.loaders.css,
      options: ({hooks}) => ({
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:5]',
        modules: true,
        sourceMap: hooks.filter('build.devtool') ? true : false,
      }),
    }),

  /**
   * .csv handler factory
   *
   * @public
   */
  csv: () =>
    new Item({
      loader: ({build}) => build.loaders.csv,
    }),

  /**
   * .html handler factory
   *
   * @public
   */
  html: () =>
    new Item({
      loader: ({build}) => build.loaders.html,
    }),

  /**
   * Factory {@link Item} for style
   *
   * @public
   */
  style: () =>
    new Item({
      loader: ({build}) => build.loaders.style,
    }),

  /**
   * Factory {@link Item} for markdown
   *
   * @public
   */
  md: () =>
    new Item({
      loader: ({build}) => build.loaders.md,
    }),

  /**
   * Factory {@link Item} for minicss-extract-plugin
   *
   * @public
   */
  minicss: () =>
    new Item({
      loader: ({build}) => build.loaders.minicss,
    }),

  /**
   * Factory {@link Item} for raw
   *
   * @public
   */
  raw: () =>
    new Item({
      loader: ({build}) => build.loaders.raw,
    }),

  /**
   * Factory {@link Item} for file
   *
   * @public
   */
  file: () =>
    new Item({
      loader: ({build}) => build.loaders.file,
      options: app => ({
        name: `${
          app.store.is('features.hash', true) && app.isProduction
            ? app.store.get('hashFormat')
            : app.store.get('fileFormat')
        }.[ext]`,
      }),
    }),

  /**
   * Factory {@link Item} resolve-url
   *
   * @public
   */
  [`resolve-url`]: () =>
    new Item({
      loader: ({build}) => build.loaders['resolve-url'],
      options: ({path, hooks}) => ({
        root: path('src'),
        sourceMap: hooks.filter('build.devtool') ?? false,
      }),
    }),

  /**
   * Factory {@link Item} for xml
   *
   * @public
   */
  xml: () =>
    new Item({
      loader: ({build}) => build.loaders.xml,
    }),
}
