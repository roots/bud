import {loader as MiniCssLoader} from 'mini-css-extract-plugin'

import {Loader} from '../Loader'

/**
 * Returns {@link Loader} for {@link import('css-loader') css-loader}
 */
export const css: () => Loader = () =>
  new Loader(require.resolve('css-loader'))

/**
 * Returns {@link Loader} for {@link import('csv-loader') csv-loader}
 */
export const csv: () => Loader = () =>
  new Loader(require.resolve('csv-loader'))

/**
 * Returns {@link Loader} for {@link import('file-loader') file-loader}
 */
export const file: () => Loader = () =>
  new Loader(require.resolve('file-loader'))

/**
 * Returns {@link Loader} for {@link import('html-loader') html-loader}
 */
export const html: () => Loader = () =>
  new Loader(require.resolve('html-loader'))

/**
 * Returns {@link Loader} for {@link import('remark-loader') remark-loader}
 */
export const md: () => Loader = () =>
  new Loader(require.resolve('remark-loader'))

/**
 * Returns {@link Loader} for {@link import('mini-css-extract-plugin').loader mini-css-extract-plugin.loader}
 */
export const minicss: () => Loader = () =>
  new Loader(MiniCssLoader)

/**
 * Returns {@link Loader} for {@link import('resolve-url-loader') resolve-url-loader}
 */
export const resolveUrl: () => Loader = () =>
  new Loader(require.resolve('resolve-url-loader'))

/**
 * Returns {@link Loader} for {@link import('style-loader') style-loader}
 */
export const style: () => Loader = () =>
  new Loader(require.resolve('style-loader'))

/**
 * Returns {@link Loader} for {@link import('url-loader') url-loader}
 */
export const url: () => Loader = () =>
  new Loader(require.resolve('url-loader'))

/**
 * Returns {@link Loader} for {@link import('xml-loader') xml-loader}
 */
export const xml: () => Loader = () =>
  new Loader(require.resolve('xml-loader'))
