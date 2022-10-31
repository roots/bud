import type {Bud} from '@roots/bud-framework'
import type {Loader} from '@roots/bud-framework/services/build'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * css loader
 *
 * @public
 */
export const css = (app: Bud): Loader => {
  const loader = `css-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * csv loader
 *
 * @public
 */
export const csv = (app: Bud): Loader => {
  const loader = `csv-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * file loader
 *
 * @public
 */
export const file = (app: Bud): Loader => {
  const loader = `file-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * html-loader
 *
 * @public
 */
export const html = (app: Bud): Loader => {
  const loader = `html-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * remark-loader
 *
 * @public
 */
export const remark = (app: Bud): Loader => {
  const loader = `remark-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * `mini-css-extract-plugin.loader`
 *
 * @public
 */
export const minicss = (app: Bud): Loader => {
  return app.build.makeLoader().setSrc(MiniCssExtractPlugin.loader)
}

/**
 * style-loader
 *
 * @public
 */
export const style = (app: Bud): Loader => {
  const loader = `style-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * xml-loader
 *
 * @public
 */
export const xml = (app: Bud): Loader => {
  const loader = `xml-loader`
  return app.build.makeLoader().setSrc(loader)
}

/**
 * yml-loader
 *
 * @public
 */
export const yml = (app: Bud): Loader => {
  const loader = `yml-loader`
  return app.build.makeLoader().setSrc(loader)
}
