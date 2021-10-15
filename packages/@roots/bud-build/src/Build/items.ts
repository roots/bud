import type {Framework} from '@roots/bud-framework'

import Item from '../Item'

/**
 * .asset handler factory
 */
export const asset = () =>
  new Item({
    loader: ({build}) => build.loaders.file,
    options: ({store}) => ({
      name: `assets/${
        store.isTrue('hash')
          ? store.get('hashFormat')
          : store.get('fileFormat')
      }.[ext]`,
    }),
  })

/**
 * .css handler factory
 */
export const css = () =>
  new Item({
    loader: ({build}) => build.loaders.css,
    options: ({hooks}) => ({
      sourceMap: hooks.filter('build/devtool') ?? false,
      importLoaders: 1,
    }),
  })

/**
 * .csv handler factory
 */
export const csv = () =>
  new Item({
    loader: ({build}) => build.loaders.csv,
  })

/**
 * .html handler factory
 */
export const html = () =>
  new Item({
    loader: ({build}) => build.loaders.html,
  })

/**
 * Factory {@link Item} for style
 */
export const style = () =>
  new Item({
    loader: ({build}) => build.loaders.style,
  })

/**
 * Factory {@link Item} for markdown
 */
export const md = () =>
  new Item({
    loader: ({build}) => build.loaders.md,
  })

/**
 * Factory {@link Item} for minicss-extract-plugin
 */
export const minicss = () =>
  new Item({
    loader: ({build}) => build.loaders.minicss,
    options: ({path}: Framework) => ({}),
  })

/**
 * Factory {@link Item} for raw
 */
export const raw = () =>
  new Item({
    loader: ({build}) => build.loaders.raw,
  })

/**
 * Factory {@link Item} for file
 */
export const file = () =>
  new Item({
    loader: ({build}) => build.loaders.file,
    options: ({store}) => ({
      name: `${
        store.isTrue('hash')
          ? store.get('hashFormat')
          : store.get('fileFormat')
      }.[ext]`,
    }),
  })

/**
 * Factory {@link Item} resolve-url
 */
export const resolveUrl = () =>
  new Item({
    loader: ({build}) => build.loaders['resolveUrl'],
    options: ({path, hooks}) => ({
      root: path('src'),
      sourceMap: hooks.filter('build/devtool') ?? false,
    }),
  })

/**
 * Factory {@link Item} for xml
 */
export const xml = () =>
  new Item({
    loader: ({build}) => build.loaders.xml,
  })
