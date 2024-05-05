import type {Factory} from '@roots/bud-build/registry'
import type {Item} from '@roots/bud-framework/services/build'

import isBoolean from '@roots/bud-support/isBoolean'

/**
 * CSS loader
 */
export const css: Factory<Item> = async ({makeItem}) =>
  makeItem({
    ident: `css`,
    loader: `css`,
    options: {modules: false},
  }).setOptions(({hooks: {filter}}) => ({
    sourceMap: isBoolean(filter(`build.devtool`))
      ? filter(`build.devtool`)
      : true,
  }))

/**
 * CSS module loader
 */
export const cssModule: Factory<Item> = async ({makeItem}) =>
  makeItem({
    ident: `css-module`,
    loader: `css`,
  }).setOptions(({build, hooks: {filter}}) => ({
    importLoaders: build.getRule(`css-module`).getUse().length - 2,
    modules: {namedExport: false},
    sourceMap: isBoolean(filter(`build.devtool`))
      ? filter(`build.devtool`)
      : true,
  }))

/**
 * CSV loader
 */
export const csv: Factory<Item> = async ({makeItem}) =>
  makeItem().setLoader(`csv`).setIdent(`csv`)

/**
 * HTML loader
 */
export const html: Factory<Item> = async ({makeItem}) =>
  makeItem().setLoader(`html`).setIdent(`html`)

/**
 * Style loader
 */
export const style: Factory<Item> = async ({makeItem}) =>
  makeItem().setLoader(`style`).setIdent(`style`)

/**
 * Markdown loader
 */
export const md: Factory<Item> = async ({makeItem}) =>
  makeItem().setIdent(`md`).setLoader(`md`)

/**
 * MiniCss loader
 */
export const minicss: Factory<Item> = async ({makeItem}) =>
  makeItem()
    .setLoader(`minicss`)
    .setIdent(`minicss`)
    .setOptions(app => ({
      publicPath: app.publicPath(),
    }))

/**
 * Raw loader
 */
export const raw: Factory<Item> = async ({makeItem}) =>
  makeItem().setLoader(`raw`).setIdent(`raw`)

/**
 * file-loader
 */
export const file: Factory<Item> = async ({makeItem}) =>
  makeItem().setLoader(`file`).setIdent(`file`)

/**
 * Yml loader
 */
export const yml: Factory<Item> = async ({makeItem}) =>
  makeItem().setLoader(`yml`).setIdent(`yml`)
