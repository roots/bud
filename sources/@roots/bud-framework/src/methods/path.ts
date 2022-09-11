import {join, normalize, resolve, sep} from 'node:path'

import type {Bud} from '../bud'
import type * as Locations from '../types/registry/locations'

type Handle = `${keyof Locations.Sync}`
type AbsolutePath = `/${string}`
type RelativePath = `${string}`
type HandleSlashPath = `${Handle}/${string}`
type FileHandle = `@name` | `@file`

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment(s)
 * @returns string
 *
 * @public
 */
export const parseAlias: (app: Bud, ...base: Array<string>) => string = (
  app,
  ...base
) => {
  /* Flatten and normalize input value */
  let [ident, ...parts] = base
    .map(path => (path.includes(sep) ? path.split(sep) : [path]))
    .flat()

  /* If there is no match for ident there is a problem */
  !app.hooks.hasSyncHook(`location.${ident as keyof Locations.Sync}`) &&
    app.error(`\`${ident}\` is not a registered path`)

  /* Replace base path */
  ident = app.hooks.filter(`location.${ident as keyof Locations.Sync}`)

  /* If segments were passed, resolve */
  return normalize(join(ident, ...(parts ?? [])))
}

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment
 * @returns string
 *
 * @public
 */
export interface path {
  (
    base?:
      | keyof Locations.SyncRegistry
      | FileHandle
      | HandleSlashPath
      | RelativePath
      | AbsolutePath,
    ...segments: Array<string>
  ): string
}
export const path: path = function (base, ...segments) {
  const app = this as Bud

  /* Exit early with context.basedir if no path was passed */
  if (!base) return app.context.basedir

  const handles = (pathString: string): string =>
    pathString
      .replace(
        `@file`,
        app.hooks.filter(`feature.hash`)
          ? `[path][name].[contenthash:6][ext]`
          : `[path][name][ext]`,
      )
      .replace(
        `@name`,
        app.hooks.filter(`feature.hash`)
          ? `[name].[contenthash:6][ext]`
          : `[name][ext]`,
      )

  if (base === `@file` || base === `@name`) return handles(base)

  base = handles(base) as any
  segments = segments.map(handles)

  /* Parse `@` aliases. Should return an absolute path */
  if (base.startsWith(`@`)) base = parseAlias(app, base) as any

  /* Resolve any base path that isn't already absolute */
  if (!base.startsWith(sep))
    base = resolve(app.context.basedir, base) as any

  /* If segments were passed, resolve them against base */
  return normalize(resolve(base, ...(segments ?? [])))
}
