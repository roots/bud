import type {Loader} from '@roots/bud-framework/services/build'
import * as MiniCss from '@roots/bud-support/mini-css-extract-plugin'

import type {Factory} from '../index.js'

export const css: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/css-loader`)

export const csv: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/csv-loader`)

export const file: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/file-loader`)

export const html: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/html-loader`)

export const remark: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/remark-loader`)

export const minicss: Factory<Loader> = ({makeLoader}) =>
  makeLoader(MiniCss.loader)

export const style: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/style-loader`)

export const xml: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/xml-loader`)

export const yml: Factory<Loader> = ({makeLoader}) =>
  makeLoader(`@roots/bud-support/yml-loader`)
