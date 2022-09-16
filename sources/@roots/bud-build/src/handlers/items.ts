import type {Bud} from '@roots/bud-framework/bud'
import type {Item} from '@roots/bud-framework/services/build'

/**
 * CSS loader
 *
 * @public
 */
export const css = (app: Bud): Item =>
  app.build
    .makeItem()
    .setIdent(`css`)
    .setLoader(`css`)
    .setOptions(() => ({
      importLoaders: app.build.rules.css.getUse().length - 2,
      modules: false,
      sourceMap: app.hooks.filter(`build.devtool`) ? true : false,
    }))

/**
 * CSS module loader
 *
 * @public
 */
export const cssModule = (app: Bud): Item =>
  app.build
    .makeItem()
    .setIdent(`cssModule`)
    .setLoader(`css`)
    .setOptions(({build, hooks}) => ({
      esModule: true,
      importLoaders: build.rules.cssModule.getUse().length - 2,
      localIdentName: `[name]__[local]___[hash:base64:5]`,
      modules: true,
      sourceMap: hooks.filter(`build.devtool`) ? true : false,
    }))

/**
 * CSV loader
 *
 * @public
 */
export const csv = (app: Bud): Item =>
  app.build.makeItem().setLoader(`csv`)

/**
 * HTML loader
 *
 * @public
 */
export const html = (app: Bud): Item =>
  app.build.makeItem().setLoader(`html`).setIdent(`html`)

/**
 * Style loader
 *
 * @public
 */
export const style = (app: Bud): Item =>
  app.build.makeItem().setLoader(`style`).setIdent(`style`)

/**
 * Markdown loader
 *
 * @public
 */
export const md = (app: Bud): Item =>
  app.build.makeItem().setIdent(`md`).setLoader(`md`)

/**
 * MiniCss loader
 *
 * @public
 */
export const minicss = (app: Bud): Item =>
  app.build
    .makeItem()
    .setLoader(`minicss`)
    .setIdent(`minicss`)
    .setOptions(app => ({
      publicPath: app.hooks.filter(`build.output.publicPath`),
    }))

/**
 * Raw loader
 *
 * @public
 */
export const raw = ({build}: Bud): Item =>
  build.makeItem().setLoader(`raw`).setIdent(`raw`)

/**
 * File loader
 *
 * @public
 */
export const file = (app: Bud): Item =>
  app.build
    .makeItem()
    .setLoader(`file`)
    .setOptions(app => ({
      name: app.hooks.filter(`feature.hash`)
        ? app.hooks.filter(`value.hashFormat`).concat(`.[ext]`)
        : app.hooks.filter(`value.fileFormat`).concat(`.[ext]`),
    }))
    .setIdent(`file`)

/**
 * Xml loader
 *
 * @public
 */
export const xml = (app: Bud): Item =>
  app.build.makeItem().setLoader(`xml`).setIdent(`xml`)

/**
 * Yml loader
 *
 * @public
 */
export const yml = (app: Bud): Item =>
  app.build.makeItem().setLoader(`yml`).setIdent(`yml`)
