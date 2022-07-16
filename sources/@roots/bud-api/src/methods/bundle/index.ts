import type {Bud} from '@roots/bud-framework'
import {isString} from 'lodash-es'

export interface method {
  (name: string, matcher?: string | Array<string>): Bud
}

export interface facade {
  (name: string, matcher?: string | Array<string>): Bud
}

/**
 * Create a module chunk
 *
 * @example
 * Create an `alpine` chunk
 *
 * ```js
 * bud.bundle('alpine', 'alpine')
 * ```
 *
 * @public
 */
export const method: method = function (name, matcher) {
  const ctx = this as Bud

  const test = compose(matcher ?? name, normalizeMatcher, makeTest)

  ctx.hooks.on(`build.optimization.splitChunks`, splitChunks => ({
    ...(splitChunks ?? {
      chunks: `all`,
      automaticNameDelimiter: `/`,
      minSize: 0,
    }),
    cacheGroups: {
      ...(splitChunks?.cacheGroups ?? {}),
      [name]: {
        idHint: name,
        filename: `js/bundle/${name}/[name].js`,
        test,
        priority: -10,
      },
    },
  }))

  return ctx
}

const compose = (v, ...fns) => fns.reduce((a, fn) => fn(a), v)

const normalizeMatcher = (
  matcher: string | Array<string>,
): Array<string> => (isString(matcher) ? [matcher] : matcher)

const makeTest = (matcher: Array<string>) =>
  new RegExp(`[\\/](${matcher.reduce((a, c) => `${a}|${c}`)})[\\/]`)
