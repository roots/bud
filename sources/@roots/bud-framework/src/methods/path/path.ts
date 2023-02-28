import {join, sep} from 'node:path'

import type {Bud} from '../../bud.js'

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment
 * @returns string
 */
export interface path {
  (...segments: Array<string>): string
}
export const path: path = function (...segments) {
  const app = this as Bud

  /* Exit early with context.basedir if no path was passed */
  if (!segments?.length) return app.context.basedir

  segments = segments.flatMap(segment => segment.split(sep))

  const hash = app.hooks.filter(`value.hashFormat`, `[contenthash:6]`)
  const name = app.hooks.filter(`value.fileFormat`, `[name]`)

  const transformMagicString = makeParseMagicString(app, hash, name)
  const parseAlias = makeParseAlias(app)

  return join(
    app.context.basedir,
    ...segments.map(transformMagicString).map(parseAlias),
  )
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
  (segment: string): string => {
    if (!(`location.${segment}` in app.hooks.syncStore.store))
      return segment

    return app.hooks.filter(`location.${segment}` as any)
  }

export const makeParseMagicString =
  (app: Bud, hash: string, name: string) => (segment: string) => {
    return segment
      .replace(`@file`, `@path@base`)
      .replace(`@base`, `@name@ext`)
      .replace(
        `@name`,
        app.hooks.filter(`feature.hash`) ? `${name}.${hash}` : name,
      )
      .replace(`@hash`, hash)
      .replace(`@path`, `[path]`)
      .replace(`@ext`, `[ext]`)
  }
