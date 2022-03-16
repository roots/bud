import {lodash} from '@roots/bud-support'

import * as Framework from '../..'

const {isString} = lodash

/**
 * setPath function interface
 *
 * @internal
 */
export interface setPath {
  <T extends `${keyof Framework.Locations & string}`>(
    arg1: T | Record<T, string>,
    arg2?: string,
  ): Framework.Framework
}

const transformShorthandBase = (
  app: Framework.Framework,
  base: string,
): string => {
  const parts = base.includes('/') ? base.split('/') : [base]
  parts[0] = app.hooks.filter(`location.${parts[0]}`)
  return parts.join('/')
}

/**
 * Set a {@link @roots/bud-framework#Location | Location} value
 *
 * @remarks
 * The {@link Location.project} should be an absolute path.
 * All other directories should be relative (src, dist, etc.)
 * @see {@link Locations}
 *
 * @example
 * ```js
 * bud.setPath('@src', 'custom/src')
 * ```
 *
 * @public
 */
export function setPath<
  T extends `${Omit<'project', keyof Framework.Locations> & string}`,
>(arg1: T | Record<T, string>, arg2?: string): Framework.Framework {
  const ctx = this as Framework.Framework

  const input = isString(arg1) ? {[arg1]: arg2} : arg1

  Object.entries(input).map(([key, value]: [string, string]) => {
    value = value.startsWith(`@`)
      ? transformShorthandBase(ctx, value)
      : value

    ctx.hooks.on(`location.${key}`, value)
    ctx.info(`${key} set to ${value}`)
  })

  return ctx
}
