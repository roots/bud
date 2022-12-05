import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {isRegExp, isString} from '@roots/bud-support/lodash-es'

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
 *
 * @public
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
 *
 * @public
 */
export const bundle: bundle = function (this: Bud, name, matcher) {
  const app = this as Bud

  const test = normalize(matcher ?? name)

  app.hooks.on(`build.optimization.splitChunks`, splitChunks => {
    const template = app.hooks.filter(`feature.hash`)
      ? `[name].[contenthash].js`
      : `[name].js`

    const filename = join(`js`, `bundle`, name, template)

    const cacheGroups =
      splitChunks &&
      typeof splitChunks === `object` &&
      splitChunks?.cacheGroups
        ? splitChunks.cacheGroups
        : {}

    return {
      ...(splitChunks ?? {
        chunks: `all`,
        automaticNameDelimiter: `/`,
        minSize: 0,
      }),
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

  app.api.logger.success(`bud.bundle: chunk settings registered`)

  return app
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
