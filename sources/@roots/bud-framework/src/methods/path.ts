import type {Bud} from '@roots/bud-framework'

import {isAbsolute, join, resolve, sep} from 'node:path'

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment
 * @returns string
 */
export interface path {
  (...values: Array<string>): string
}
export const path: path = function (...values) {
  /* Exit early with context.basedir if no path was passed */
  if (!values?.length) return this.context.basedir

  if (isAbsolute(join(...values))) {
    return join(...values)
  }

  values = values.flatMap(value => value.split(sep))

  const hash =
    this.hooks.filter(`value.hashFormat`, `[contenthash:6]`) ??
    `[contenthash:6]`
  const name = this.hooks.filter(`value.fileFormat`, `[name]`) ?? `[name]`

  const transformMagicString = makeParseMagicString(
    this.context.hash ? `${name}.${hash}` : name,
    hash,
  )

  const parseAlias = makeParseAlias(this)

  const result = join(...values.map(transformMagicString).map(parseAlias))

  return isAbsolute(result)
    ? result
    : resolve(this.context.basedir, result)
}

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment(s)
 * @returns string
 */
export const makeParseAlias =
  (app: Bud) =>
  (segment: string, i: number): string => {
    if (!(`location.${segment}` in app.hooks.syncStore.store))
      return segment

    return app.hooks.filter(`location.${segment}` as any)
  }

export const makeParseMagicString =
  (name: string, hash: string) => (segment: string) => {
    return segment
      .replace(`@file`, `@path@base`)
      .replace(`@base`, `@name@ext`)
      .replace(`@name`, name)
      .replace(`@hash`, hash)
      .replace(`@path`, `[path]`)
      .replace(`@ext`, `[ext]`)
  }
