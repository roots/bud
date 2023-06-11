import type {Bud} from '@roots/bud-framework'

import isRegExp from '@roots/bud-support/lodash/isRegExp'
import isString from '@roots/bud-support/lodash/isString'
import {join, sep} from 'node:path'

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

  this.hooks.on(`build.optimization.splitChunks`, splitChunks => {
    const template = this.context.hash
      ? `[name].[contenthash].js`
      : `[name].js`

    const entry = {
      [name]: {
        filename: join(`js`, `bundle`, name, template),
        idHint: name,
        priority: -10,
        test,
      },
    }

    if (splitChunks === false || splitChunks === undefined) {
      return {
        automaticNameDelimiter: sep,
        cacheGroups: {...entry},
        chunks: `all`,
        minSize: 0,
      }
    }

    return {
      ...splitChunks,
      cacheGroups: {
        ...(splitChunks.cacheGroups ?? {}),
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
