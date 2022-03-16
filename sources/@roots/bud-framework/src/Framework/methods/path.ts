import {join, resolve, sep as slash} from 'node:path'

import {Framework} from '../..'

export interface path {
  (base?: string, ...segments: Array<string>): string
}

/**
 * Transform `@alias` path
 *
 * @param app - Framework instance
 * @param base - Path segment
 * @returns string
 *
 * @public
 */
const transformShorthandBase = (app: Framework, base: string): string => {
  /**
   * If path contains multiple segments, explode into an array
   * If path contains one segment, insert it into a blank array
   */
  const [ident, ...parts] = base.includes(slash)
    ? base.split(slash)
    : [base]

  !app.hooks.has(`location.${ident}`) &&
    app.error(
      `\`${ident}\` is not a registered path. It must be defined with bud.setPath`,
    )

  /**
   * Replace
   */
  const value = app.hooks.filter(`location.${ident}`)

  return join(value, ...(parts ?? []).filter(Boolean))
}

export const path: path = function (
  base?: string,
  ...segments: Array<string>
): string {
  const app = this as Framework
  /**
   * If no base path was provided return the project directory
   */
  if (!base) return app.context.projectDir

  /**
   * If base path starts with `/` return the joined path and segments (if any)
   */
  if (base.startsWith('/'))
    return segments.length ? join(base, ...segments) : base

  /**
   * Replace any `@alias` aliases with their corresponding entry
   */
  const normalized = base.startsWith(`@`)
    ? transformShorthandBase(app, base)
    : base

  const absolutePath = base.startsWith(`/`)
    ? normalized
    : resolve(app.context.projectDir, normalized)

  return segments.length
    ? resolve(absolutePath, ...(segments ?? []).filter(Boolean))
    : absolutePath
}
