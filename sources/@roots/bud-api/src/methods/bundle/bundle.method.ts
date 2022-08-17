import type {Bud} from '@roots/bud-framework'
import {isRegExp, isString} from 'lodash-es'
import {join, sep} from 'node:path'

/**
 * Create a module chunk
 *
 * @example
 * Create an `alpine` chunk
 *
 * ```js
 * bud.bundle('alpine')
 * ```
 *
 * @public
 */
export interface method {
  (name: string, matcher?: string | Array<string> | RegExp): Bud
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
 *
 * @public
 */
export const bundle: method = function (name, matcher) {
  const ctx = this as Bud

  const test = normalize(matcher ?? name)

  ctx.hooks.on(`build.optimization.splitChunks`, splitChunks => {
    const template = ctx.hooks.filter(`feature.hash`)
      ? `[name].[contenthash].js`
      : `[name].js`

    const filename = join(`js`, `bundle`, name, template)

    const existing = splitChunks ?? {
      chunks: `all`,
      automaticNameDelimiter: sep,
      minSize: 0,
    }
    const cacheGroups = existing?.cacheGroups ?? {}

    return {
      ...existing,
      cacheGroups: {
        ...cacheGroups,
        [name]: {
          idHint: name,
          filename,
          test,
          priority: -10,
        },
      },
    }
  })

  return ctx
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
