import type {Framework} from '@roots/bud-framework'
import CopyPlugin from 'copy-webpack-plugin'
import {isArray, isString} from 'lodash'
import {normalize} from 'path'

import type {method} from './assets.interface'

export const assets: method = async function assets(
  ...request: Array<
    | string
    | CopyPlugin.ObjectPattern
    | Array<string | CopyPlugin.ObjectPattern>
  >
): Promise<Framework> {
  /**
   * tsc will complain about `this` context being lost
   * when destructuring bud even though the context of
   * this function will be bound.
   */
  const ctx = this as Framework

  /**
   * Flatten request
   */
  request = request.flat()

  /**
   * We know it's not a directory
   * - when it ends with a globstar
   *
   * We'll say it's a directory when:
   * - a pattern ends with `/`
   * - a pattern has segments and it's last path segment does not contain a `.`
   * - a pattern has no segments and does not contain a dot
   */
  const isDirectoryish = (pattern: string) => {
    if (pattern.endsWith('*')) return false
    if (pattern.endsWith('/')) return true
    if (pattern.includes('/') && !pattern.split('/').pop().includes('.'))
      return true

    return !pattern.includes('.')
  }
  /**
   * Return a wildcard glob for a given path
   */
  const toWildcard = (pattern: string) => normalize(`${pattern}/**/*`)
  /**
   * Replace a leading dot with the project path
   */
  const fromDotRel = (pattern: string) =>
    pattern.startsWith('./')
      ? pattern.replace('./', `/`.concat(ctx.path('project')))
      : pattern

  /**
   * Take an input string and return a {@link CopyPlugin.ObjectPattern}
   */
  const makePatternObject = (input: string): CopyPlugin.ObjectPattern => {
    /**
     * Process raw user input.
     *
     * - Replace leading dot with project path
     * - Append wildcard glob to directory requests
     */
    const from = isDirectoryish(input)
      ? fromDotRel(toWildcard(input))
      : fromDotRel(input)

    /**
     * Test if input starts with a given string
     */
    const test = (test: string) => from.startsWith(test)

    /**
     * Return path that serves as base of request
     *
     * @remarks
     * In order of priority:
     *  - project `src` path
     *  - project path
     *  - raw input
     */
    const context = () => {
      if (test(ctx.path('src'))) return ctx.path('src')
      if (test(ctx.path('project'))) return ctx.path('project')
      if (!test('/')) return ctx.path('src')
      else return
    }

    return {
      from,
      context: context(),
      noErrorOnMissing: true,
    }
  }

  /**
   * Parse a request item
   */
  const parse = (request: string | CopyPlugin.ObjectPattern) => {
    return isString(request) ? makePatternObject(request) : request
  }

  const mergePattern = isArray(request)
    ? request.map(parse)
    : [parse(request)]

  ctx.extensions
    .get('copy-webpack-plugin')
    .mergeOption('patterns', mergePattern)

  return ctx
}
