import type {Loader} from '@roots/bud-framework/services/build'
import * as MiniCss from '@roots/bud-support/mini-css-extract-plugin'

import type {Factory} from '../index.js'

export const css: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/css-loader`, import.meta.url),
  )

export const csv: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/csv-loader`, import.meta.url),
  )

export const file: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/file-loader`, import.meta.url),
  )

export const html: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/html-loader`, import.meta.url),
  )

export const remark: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/remark-loader`, import.meta.url),
  )

export const minicss: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(MiniCss.loader)

export const style: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/style-loader`, import.meta.url),
  )

export const xml: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/xml-loader`, import.meta.url),
  )

export const yml: Factory<Loader> = async ({makeLoader, resolve}) =>
  makeLoader(
    await resolve(`@roots/bud-support/yml-loader`, import.meta.url),
  )
