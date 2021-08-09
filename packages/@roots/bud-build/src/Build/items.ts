import type {Framework} from '@roots/bud-framework'
import * as RemarkHTML from 'remark-html'

import {Item} from '../Item'

/**
 * Returns {@link Item} for assets
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
 * Returns {@link Item} for css
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
 * Returns {@link Item} for csv
 */
export const csv = () =>
  new Item({
    loader: ({build}) => build.loaders.csv,
  })

/**
 * Returns {@link Item} for html
 */
export const html = () =>
  new Item({
    loader: ({build}) => build.loaders.html,
  })

/**
 * Returns {@link Item} for style
 */
export const style = () =>
  new Item({
    loader: ({build}) => build.loaders.style,
  })

/**
 * Returns {@link Item} for markdown
 */
export const md = () =>
  new Item({
    loader: ({build}) => build.loaders.md,
    options: {
      remarkOptions: {
        plugins: [RemarkHTML],
      },
    },
  })

/**
 * Returns {@link Item} for minicss-extract-plugin
 */
export const minicss = () =>
  new Item({
    loader: ({build}) => build.loaders.minicss,
    options: ({path}: Framework) => ({}),
  })

/**
 * Returns {@link Item} for raw
 */
export const raw = () =>
  new Item({
    loader: ({build}) => build.loaders.raw,
  })

/**
 * Returns {@link Item} for file
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
 * Returns {@link Item} resolve-url
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
 * Returns {@link Item} for xml
 */
export const xml = () =>
  new Item({
    loader: ({build}) => build.loaders.xml,
  })
