import type {Bud} from '@roots/bud-framework'

import {join, sep} from 'node:path'

import isRegExp from '@roots/bud-support/lodash/isRegExp'
import isString from '@roots/bud-support/lodash/isString'

export type Parameters = [string, (Array<string> | RegExp | string)?]

/**
 * Create a module chunk
 *
 * @example
 * Create an `alpine` chunk
 *
 * ```js
 * bud.bundle('alpine')
 * ```
 */
export interface bundle {
  (...params: Parameters): Bud
}

/**
 * Create a module chunk
 *
 * @example
 * Create an `alpine` chunk
 *
 * ```js
 * bud.bundle('alpine')
 * ```
 */
export const bundle: bundle = function (this: Bud, name, matcher) {
  const test = normalize(matcher ?? name)

  this.hooks.on(`build.optimization.splitChunks`, options => {
    const entry = {
      [name]: {
        chunks: `all` as any,
        enforce: true,
        filename: join(`js`, `bundle`, `[name].js`),
        idHint: name,
        name,
        priority: -10,
        test,
      },
    }

    if (options === false || options === undefined) {
      return {
        automaticNameDelimiter: sep,
        cacheGroups: {default: false, ...entry},
      }
    }

    return {
      ...options,
      cacheGroups: {
        ...(options.cacheGroups ?? {}),
        ...entry,
      },
    }
  })

  this.api.logger.success(`bud.bundle: chunk settings registered`)

  return this
}

const normalize = (matcher: Array<string> | RegExp | string): RegExp => {
  return isRegExp(matcher)
    ? matcher
    : isString(matcher)
    ? getTestRegExp([matcher])
    : getTestRegExp(matcher)
}

const getTestRegExp = (matcher: Array<string>): RegExp =>
  new RegExp(`[\\/](${matcher.reduce((a, c) => `${a}|${c}`)})[\\/]`)
