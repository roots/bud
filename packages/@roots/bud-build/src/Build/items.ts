import {Item} from '../Item'
import RemarkHTML from 'remark-html'

import type {Framework} from '@roots/bud-framework'

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

export const css = () =>
  new Item({
    loader: ({build}) => build.loaders.css,
    options: ({hooks}) => ({
      sourceMap: hooks.filter('build/devtool') ?? false,
      importLoaders: 1,
    }),
  })

export const csv = () =>
  new Item({
    loader: ({build}) => build.loaders.csv,
  })

export const html = () =>
  new Item({
    loader: ({build}) => build.loaders.html,
  })
export const style = () =>
  new Item({
    loader: ({build}) => build.loaders.style,
  })

export const md = () =>
  new Item({
    loader: ({build}) => build.loaders.md,
    options: {
      remarkOptions: {
        plugins: [RemarkHTML],
      },
    },
  })

export const minicss = () =>
  new Item({
    loader: ({build}) => build.loaders.minicss,
    options: ({path}: Framework) => ({}),
  })

export const raw = () =>
  new Item({
    loader: ({build}) => build.loaders.raw,
  })

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

export const resolveUrl = () =>
  new Item({
    loader: ({build}) => build.loaders['resolveUrl'],
    options: ({path, hooks}) => ({
      root: path('src'),
      sourceMap: hooks.filter('build/devtool') ?? false,
    }),
  })

export const xml = () =>
  new Item({
    loader: ({build}) => build.loaders.xml,
  })
