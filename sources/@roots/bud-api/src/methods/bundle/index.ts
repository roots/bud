import {join, sep} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import isRegExp from '@roots/bud-support/lodash/isRegExp'
import isString from '@roots/bud-support/lodash/isString'

export type Parameters = [string, (string | Array<string> | RegExp)?]

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
    const template = this.hooks.filter(`feature.hash`)
      ? `[name].[contenthash].js`
      : `[name].js`

    const entry = {
      [name]: {
        idHint: name,
        filename: join(`js`, `bundle`, name, template),
        test,
        priority: -10,
      },
    }

    if (splitChunks === false || splitChunks === undefined) {
      return {
        chunks: `all`,
        automaticNameDelimiter: sep,
        minSize: 0,
        cacheGroups: {...entry},
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

const normalize = (matcher: string | Array<string> | RegExp): RegExp => {
  return isRegExp(matcher)
    ? matcher
    : isString(matcher)
    ? getTestRegExp([matcher])
    : getTestRegExp(matcher)
}

const getTestRegExp = (matcher: Array<string>): RegExp =>
  new RegExp(`[\\/](${matcher.reduce((a, c) => `${a}|${c}`)})[\\/]`)
