import {lodash} from '@roots/bud-support'

import * as Framework from '../..'

const {isString} = lodash

/**
 * setPath function interface
 *
 * @internal
 */
export interface setPath {
  <
    T extends `${Omit<'project', `${keyof Framework.Locations & string}`> &
      string}`,
  >(
    arg1: T | Record<T, string>,
    arg2?: string,
  ): Framework.Framework
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
 * bud.setPath('src', 'custom/src')
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
    key = key.startsWith('@') ? key.split('').splice(1).join('') : key
    ctx.hooks.on(`location.${key}`, value)
    ctx.info(`${key} set to ${value}`)
  })

  return ctx
}
