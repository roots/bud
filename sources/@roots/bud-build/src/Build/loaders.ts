import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import {Loader} from '../Loader'

export default {
  /**
   * Returns {@link Loader} from `css-loader`
   * @public
   */
  css: () => new Loader(require.resolve('css-loader')),
  /**
   * Returns {@link Loader} for `csv-loader`
   * @public
   */
  csv: () => new Loader(require.resolve('csv-loader')),

  /**
   * Returns {@link Loader} for `file-loader`
   * @public
   */
  file: () => new Loader(require.resolve('file-loader')),

  /**
   * Returns {@link Loader} for `html-loader`
   * @public
   */
  html: () => new Loader(require.resolve('html-loader')),

  /**
   * Returns {@link Loader} for `remark-loader`
   * @public
   */
  md: () => new Loader(require.resolve('remark-loader')),

  /**
   * Returns {@link Loader} for `mini-css-extract-plugin.loader`
   * @public
   */
  minicss: () => new Loader(MiniCssExtractPlugin.loader),

  /**
   * Returns {@link Loader} for `resolve-url-loader`
   * @public
   */
  [`resolve-url`]: () => new Loader(require.resolve('resolve-url-loader')),

  /**
   * Returns {@link Loader} for `style-loader`
   * @public
   */
  style: () => new Loader(require.resolve('style-loader')),

  /**
   * Returns {@link Loader} for `url-loader`
   * @public
   */
  url: () => new Loader(require.resolve('url-loader')),

  /**
   * Returns {@link Loader} for `xml-loader`
   * @public
   */
  xml: () => new Loader(require.resolve('xml-loader')),
}
