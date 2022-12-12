import type {Item} from '@roots/bud-framework/services/build'

import type {Factory} from '../index.js'

/**
 * CSS loader
 *
 * @public
 */
export const css: Factory<Item> = ({makeItem}) =>
  makeItem()
    .setIdent(`css`)
    .setLoader(`css`)
    .setOptions(({build: {rules}, hooks: {filter}}) => ({
      importLoaders: rules.css.getUse().length - 2,
      modules: false,
      sourceMap: filter(`build.devtool`, false),
    }))

/**
 * CSS module loader
 *
 * @public
 */
export const cssModule: Factory<Item> = ({makeItem}) =>
  makeItem()
    .setIdent(`cssModule`)
    .setLoader(`css`)
    .setOptions(({build: {rules}, hooks: {filter}}) => ({
      esModule: true,
      importLoaders: rules.cssModule.getUse().length - 2,
      localIdentName: `[name]__[local]___[hash:base64:5]`,
      modules: true,
      sourceMap: filter(`build.devtool`, false),
    }))

/**
 * CSV loader
 *
 * @public
 */
export const csv: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`csv`)

/**
 * HTML loader
 *
 * @public
 */
export const html: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`html`).setIdent(`html`)

/**
 * Style loader
 *
 * @public
 */
export const style: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`style`).setIdent(`style`)

/**
 * Markdown loader
 *
 * @public
 */
export const md: Factory<Item> = ({makeItem}) =>
  makeItem().setIdent(`md`).setLoader(`md`)

/**
 * MiniCss loader
 *
 * @public
 */
export const minicss: Factory<Item> = ({makeItem}) =>
  makeItem()
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
export const raw: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`raw`).setIdent(`raw`)

/**
 * File loader
 *
 * @public
 */
export const file: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`file`).setIdent(`file`)

/**
 * Xml loader
 *
 * @public
 */
export const xml: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`xml`).setIdent(`xml`)

/**
 * Yml loader
 *
 * @public
 */
export const yml: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`yml`).setIdent(`yml`)
