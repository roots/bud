import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import Loader from '../Loader'

/**
 * @remarks default export because of the `resolve-url` name
 */
export default {
  css: () => new Loader(require.resolve('css-loader')),
  /**
   * Returns {@link Loader} for `csv-loader`
   */
  csv: () => new Loader(require.resolve('csv-loader')),

  /**
   * Returns {@link Loader} for `file-loader`
   */
  file: () => new Loader(require.resolve('file-loader')),

  /**
   * Returns {@link Loader} for `html-loader`
   */
  html: () => new Loader(require.resolve('html-loader')),

  /**
   * Returns {@link Loader} for `remark-loader`
   */
  md: () => new Loader(require.resolve('remark-loader')),

  /**
   * Returns {@link Loader} for `mini-css-extract-plugin.loader`
   */
  minicss: () => new Loader(MiniCssExtractPlugin.loader),

  /**
   * Returns {@link Loader} for `resolve-url-loader`
   */
  [`resolve-url`]: () =>
    new Loader(require.resolve('resolve-url-loader')),

  /**
   * Returns {@link Loader} for `style-loader`
   */
  style: () => new Loader(require.resolve('style-loader')),

  /**
   * Returns {@link Loader} for `url-loader`
   */
  url: () => new Loader(require.resolve('url-loader')),

  /**
   * Returns {@link Loader} for `xml-loader`
   */
  xml: () => new Loader(require.resolve('xml-loader')),
}
