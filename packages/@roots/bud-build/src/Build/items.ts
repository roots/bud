import type {Framework} from '@roots/bud-framework'

import {Item} from '../Item'

/**
 * .asset handler factory
 */
export default {
  asset: () =>
    new Item({
      loader: ({build}) => build.loaders.file,
      options: ({store}) => ({
        name: `assets/${
          store.is('features.hash', true)
            ? store.get('hashFormat')
            : store.get('fileFormat')
        }.[ext]`,
      }),
    }),

  /**
   * .css handler factory
   */
  css: () =>
    new Item({
      loader: ({build}) => build.loaders.css,
      options: ({hooks}) => ({
        sourceMap: hooks.filter('build.devtool') ? true : false,
        importLoaders: 1,
      }),
    }),

  /**
   * .csv handler factory
   */
  csv: () =>
    new Item({
      loader: ({build}) => build.loaders.csv,
    }),

  /**
   * .html handler factory
   */
  html: () =>
    new Item({
      loader: ({build}) => build.loaders.html,
    }),

  /**
   * Factory {@link Item} for style
   */
  style: () =>
    new Item({
      loader: ({build}) => build.loaders.style,
    }),

  /**
   * Factory {@link Item} for markdown
   */
  md: () =>
    new Item({
      loader: ({build}) => build.loaders.md,
    }),

  /**
   * Factory {@link Item} for minicss-extract-plugin
   */
  minicss: () =>
    new Item({
      loader: ({build}) => build.loaders.minicss,
      options: ({store}: Framework) => ({}),
    }),

  /**
   * Factory {@link Item} for raw
   */
  raw: () =>
    new Item({
      loader: ({build}) => build.loaders.raw,
    }),

  /**
   * Factory {@link Item} for file
   */
  file: () =>
    new Item({
      loader: ({build}) => build.loaders.file,
      options: ({store}) => ({
        name: `${
          store.is('features.hash', true)
            ? store.get('hashFormat')
            : store.get('fileFormat')
        }.[ext]`,
      }),
    }),

  /**
   * Factory {@link Item} resolve-url
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
   */
  xml: () =>
    new Item({
      loader: ({build}) => build.loaders.xml,
    }),
}
