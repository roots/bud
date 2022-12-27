import type {Loader} from '@roots/bud-framework/services/build'
import * as MiniCss from '@roots/bud-support/mini-css-extract-plugin'

import type {Factory} from '../index.js'

export const css: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`css-loader`)

export const csv: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`csv-loader`)

export const file: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`file-loader`)

export const html: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`html-loader`)

export const remark: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`remark-loader`)

export const minicss: Factory<Loader> = ({makeLoader}) =>
  makeLoader(MiniCss.loader)

export const style: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`style-loader`)

export const xml: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`xml-loader`)

export const yml: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`yml-loader`)
