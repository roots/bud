import type {Item} from '@roots/bud-framework/services/build'
import isBoolean from '@roots/bud-support/lodash/isBoolean'

import type {Factory} from '../index.js'

/**
 * CSS loader
 */
export const css: Factory<Item> = ({makeItem}) =>
  makeItem()
    .setIdent(`css`)
    .setLoader(`css`)
    .setOptions(({build: {rules}, hooks: {filter}}) => ({
      importLoaders: rules.css.getUse().length - 2,
      modules: false,
      sourceMap: isBoolean(filter(`build.devtool`, false))
        ? filter(`build.devtool`, false)
        : true,
    }))

/**
 * CSS module loader
 */
export const cssModule: Factory<Item> = ({makeItem}) =>
  makeItem()
    .setIdent(`cssModule`)
    .setLoader(`css`)
    .setOptions(({build: {rules}, hooks: {filter}}) => ({
      importLoaders: rules.cssModule.getUse().length - 2,
      modules: true,
      sourceMap: isBoolean(filter(`build.devtool`, false))
        ? filter(`build.devtool`, false)
        : true,
    }))

/**
 * CSV loader
 */
export const csv: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`csv`).setIdent(`csv`)

/**
 * HTML loader
 */
export const html: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`html`).setIdent(`html`)

/**
 * Style loader
 */
export const style: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`style`).setIdent(`style`)

/**
 * Markdown loader
 */
export const md: Factory<Item> = ({makeItem}) =>
  makeItem().setIdent(`md`).setLoader(`md`)

/**
 * MiniCss loader
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
 */
export const raw: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`raw`).setIdent(`raw`)

/**
 * File loader
 */
export const file: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`file`).setIdent(`file`)

/**
 * Xml loader
 */
export const xml: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`xml`).setIdent(`xml`)

/**
 * Yml loader
 */
export const yml: Factory<Item> = ({makeItem}) =>
  makeItem().setLoader(`yml`).setIdent(`yml`)
