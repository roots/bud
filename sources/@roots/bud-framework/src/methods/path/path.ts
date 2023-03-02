import {isAbsolute, join, resolve, sep} from 'node:path'

import type {Bud} from '../../bud.js'

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
  const app = this as Bud

  /* Exit early with context.basedir if no path was passed */
  if (!values?.length) return app.context.basedir

  if (isAbsolute(join(...values))) {
    return join(...values)
  }

  values = values.flatMap(value => value.split(sep))

  const hash = app.hooks.filter(`value.hashFormat`, `[contenthash:6]`)
  const name = app.hooks.filter(`value.fileFormat`, `[name]`)

  const transformMagicString = makeParseMagicString(
    app.hooks.filter(`feature.hash`) ? `${name}.${hash}` : name,
    hash,
  )

  const parseAlias = makeParseAlias(app)

  const result = join(...values.map(transformMagicString).map(parseAlias))

  return isAbsolute(result) ? result : resolve(app.context.basedir, result)
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
