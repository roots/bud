import {Bud} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * css loader
 *
 * @public
 */
export const css = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('css-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * csv loader
 *
 * @public
 */
export const csv = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('csv-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * file loader
 *
 * @public
 */
export const file = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('file-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * html-loader
 *
 * @public
 */
export const html = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('html-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * remark-loader
 *
 * @public
 */
export const remark = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('remark-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * `mini-css-extract-plugin.loader`
 *
 * @public
 */
export const minicss = async (app: Bud): Promise<any> => {
  return app.build.makeLoader().setSrc(MiniCssExtractPlugin.loader)
}

/**
 * resolve-url-loader
 *
 * @public
 */
export const resolveUrl = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('resolve-url-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * style-loader
 *
 * @public
 */
export const style = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('style-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * url-loader
 *
 * @public
 */
export const url = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('url-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * xml-loader
 *
 * @public
 */
export const xml = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('xml-loader')
  return app.build.makeLoader().setSrc(loader)
}

/**
 * yml-loader
 *
 * @public
 */
export const yml = async (app: Bud): Promise<any> => {
  const loader = await app.module.resolve('yml-loader')
  return app.build.makeLoader().setSrc(loader)
}
