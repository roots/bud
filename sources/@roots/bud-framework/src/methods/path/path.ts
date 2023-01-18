import {join, normalize, resolve, sep} from 'node:path'

import type {Bud} from '../../bud.js'
import type * as Locations from '../../types/registry/locations.js'

type Handle = `${keyof Locations.Sync}`
type AbsolutePath = `/${string}`
type RelativePath = `${string}`
type HandleSlashPath = `${Handle}/${string}`
type FileHandle = `@path` | `@name` | `@file` | `@project`

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment(s)
 * @returns string
 */
export const parseAlias: (app: Bud, ...base: Array<string>) => string = (
  app,
  ...base
) => {
  /* Flatten and normalize input value */
  let [ident, ...parts] = base
    .map(path => (path.includes(sep) ? path.split(sep) : [path]))
    .flat()

  const hook: `location.${keyof Locations.Sync}` = `location.${
    ident as keyof Locations.Sync
  }`

  /* If there is no match for ident there is a problem */
  !app.hooks.hasSyncHook(hook) &&
    app.error(`\`${ident}\` is not a registered path`)

  /* Replace base path */
  ident = app.hooks.filter(hook)

  /* If segments were passed, resolve */
  return normalize(join(ident, ...(parts ?? [])))
}

/**
 * Transform `@alias` path
 *
 * @param app - Bud instance
 * @param base - Path segment
 * @returns string
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

  const hash = app.hooks.filter(`value.hashFormat`, `[contenthash:6]`)
  const name = app.hooks.filter(`value.fileFormat`, `[name]`)

  const transformMagicString = (path: string): string =>
    path
      .replace(`@file`, `@path@base`)
      .replace(`@base`, `@name@ext`)
      .replace(
        `@name`,
        app.hooks.filter(`feature.hash`) ? `${name}.@hash` : name,
      )
      .replace(`@hash`, app.hooks.filter(`feature.hash`) ? hash : ``)
      .replace(`@path`, `[path]`)
      .replace(`@ext`, `[ext]`)

  if (
    [`@file`, `@base`, `@name`, `@path`, `@ext`, `@hash`].some(
      magicString => base?.includes(magicString),
    )
  )
    return transformMagicString(base)

  base = transformMagicString(base)

  segments = segments?.map(transformMagicString) ?? []

  /* Parse `@` aliases. Should return an absolute path */
  if (base.startsWith(`@`)) base = parseAlias(app, base)

  /* Resolve any base path that isn't already absolute */
  if (!base.startsWith(sep)) base = resolve(app.context.basedir, base)

  /* If segments were passed, resolve them against base */
  return normalize(resolve(base, ...segments))
}
