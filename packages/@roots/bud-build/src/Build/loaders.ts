import {loader as MiniCssLoader} from 'mini-css-extract-plugin'

import {Loader} from '../Loader'

/**
 * Returns {@link Loader} for `css-loader`
 */
export const css: () => Loader = () =>
  new Loader(require.resolve('css-loader'))

/**
 * Returns {@link Loader} for `csv-loader`
 */
export const csv: () => Loader = () =>
  new Loader(require.resolve('csv-loader'))

/**
 * Returns {@link Loader} for `file-loader`
 */
export const file: () => Loader = () =>
  new Loader(require.resolve('file-loader'))

/**
 * Returns {@link Loader} for `html-loader`
 */
export const html: () => Loader = () =>
  new Loader(require.resolve('html-loader'))

/**
 * Returns {@link Loader} for `remark-loader`
 */
export const md: () => Loader = () =>
  new Loader(require.resolve('remark-loader'))

/**
 * Returns {@link Loader} for `mini-css-extract-plugin.loader`
 */
export const minicss: () => Loader = () =>
  new Loader(MiniCssLoader)

/**
 * Returns {@link Loader} for `resolve-url-loader`
 */
export const resolveUrl: () => Loader = () =>
  new Loader(require.resolve('resolve-url-loader'))

/**
 * Returns {@link Loader} for `style-loader`
 */
export const style: () => Loader = () =>
  new Loader(require.resolve('style-loader'))

/**
 * Returns {@link Loader} for `url-loader`
 */
export const url: () => Loader = () =>
  new Loader(require.resolve('url-loader'))

/**
 * Returns {@link Loader} for `xml-loader`
 */
export const xml: () => Loader = () =>
  new Loader(require.resolve('xml-loader'))
