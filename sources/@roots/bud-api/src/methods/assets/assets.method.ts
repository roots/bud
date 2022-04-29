import type {Bud} from '@roots/bud-framework'
import CopyPlugin from 'copy-webpack-plugin'
import {isArray, isString} from 'lodash'
import {normalize} from 'path'

import type {method} from './assets.interface'

export const assets: method = async function assets(
  ...request: Array<
    | string
    | CopyPlugin.ObjectPattern
    | Array<string | [string, string] | CopyPlugin.ObjectPattern>
  >
): Promise<Bud> {
  /**
   * tsc will complain about `this` context being lost
   * when destructuring bud even though the context of
   * this function will be bound.
   */
  const ctx = this as Bud

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
    if (pattern.includes('*')) return false
    if (pattern.endsWith('/')) return true
    if (pattern.includes('/') && !pattern.split('/').pop().includes('.'))
      return true

    return !pattern.split('/').pop().includes('.')
  }

  /**
   * Return a wildcard glob for a given path
   */
  const toWildcard = (pattern: string) => normalize(`${pattern}/**/*`)

  /**
   * Replace a leading dot with the project path
   */
  const fromDotRel = (pattern: string) =>
    pattern?.startsWith('./') ? pattern.replace('./', ctx.path()) : pattern

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

    return {
      from,
      to: ctx.path('@name'),
      context: ctx.path('@src'),
      noErrorOnMissing: true,
    }
  }

  /**
   * Handle tuple set
   *
   * @param tuple - [origin, destination]
   * @returns
   */
  const makeFromTo = ([from, to]: [string, string]) => {
    /**
     * Process raw user input.
     *
     * - Replace leading dot with project path
     * - Append wildcard glob to directory requests
     */
    from = isDirectoryish(from)
      ? fromDotRel(toWildcard(from))
      : fromDotRel(from)

    return {
      from,
      to,
      context: ctx.path('@src'),
      noErrorOnMissing: true,
    }
  }

  /**
   * Parse a request item
   */
  const parse = (request: string | CopyPlugin.ObjectPattern) => {
    return isString(request) ? makePatternObject(request) : request
  }

  const appearsTupled = isArray(request[0]) && isArray(request[0][0])

  if (appearsTupled) {
    ctx.extensions.get('copy-webpack-plugin').setOptions(options => ({
      ...(options ?? {}),
      patterns: [
        ...(options?.patterns ?? []),
        ...request.flat().map(makeFromTo),
      ],
    }))

    return ctx
  }

  ctx.extensions.get('copy-webpack-plugin').setOptions(options => ({
    ...(options ?? {}),
    patterns: [...(options?.patterns ?? []), ...request.flat().map(parse)],
  }))

  return ctx
}
