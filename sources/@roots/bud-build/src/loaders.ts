import {Bud} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * css loader
 */
export const css = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('css-loader'))

/**
 * csv loader
 */
export const csv = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('csv-loader'))

export const file = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('file-loader'))

/**
 * Returns {@link Loader} for `html-loader`
 * @public
 */
export const html = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('html-loader'))

/**
 * Returns {@link Loader} for `remark-loader`
 * @public
 */
export const md = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('remark-loader'))

/**
 * Returns {@link Loader} for `mini-css-extract-plugin.loader`
 * @public
 */
export const minicss = (app: Bud) =>
  app.build.makeLoader().setSrc(MiniCssExtractPlugin.loader)

/**
 * Returns {@link Loader} for `resolve-url-loader`
 * @public
 */
export const resolveUrl = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('resolve-url-loader'))

/**
 * Returns {@link Loader} for `style-loader`
 * @public
 */
export const style = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('style-loader'))

/**
 * Returns {@link Loader} for `url-loader`
 * @public
 */
export const url = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('url-loader'))

/**
 * Returns {@link Loader} for `xml-loader`
 * @public
 */
export const xml = (app: Bud) =>
  app.build.makeLoader().setSrc(require.resolve('xml-loader'))
