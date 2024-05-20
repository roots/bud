import type {Factory} from '@roots/bud-build/registry'
import type {Loader} from '@roots/bud-framework/services/build'

import * as MiniCss from '@roots/bud-support/mini-css-extract-plugin'

export const css: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/css-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/css-loader not found`)
  }
  return makeLoader(path)
}

export const csv: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/csv-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/csv-loader not found`)
  }
  return makeLoader(path)
}

export const file: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/file-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/csv-loader not found`)
  }
  return makeLoader(path)
}

export const html: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/html-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/html-loader not found`)
  }
  return makeLoader(path)
}

export const remark: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/remark-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/remark-loader not found`)
  }
  return makeLoader(path)
}

export const minicss: Factory<Loader> = async ({makeLoader, resolve}) => {
  return makeLoader(MiniCss.loader)
}

export const style: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/style-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/style-loader not found`)
  }
  return makeLoader(path)
}

export const yml: Factory<Loader> = async ({makeLoader, resolve}) => {
  const path = await resolve(
    `@roots/bud-support/yml-loader`,
    import.meta.url,
  )
  if (!path) {
    throw new Error(`@roots/bud-support/yml-loader not found`)
  }
  return makeLoader(path)
}
