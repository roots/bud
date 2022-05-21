import type {Bud} from '@roots/bud-framework'
import CopyPlugin from 'copy-webpack-plugin'
import {isArray, isString} from 'lodash'
import {join, normalize} from 'path'

import type {method} from './assets.interface'

export const appearsTupled = (request: any): boolean =>
  isArray(request[0]) && isArray(request[0][0])

export const toWildcard = (pattern: string) => normalize(`${pattern}/**/*`)

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
  const app = this as Bud

  /**
   * Replace a leading dot with the project path
   */
  const fromDotRel = (pattern: string) =>
    pattern?.startsWith('./') ? pattern.replace('./', app.path()) : pattern

  /**
   * Take an input string and return a {@link CopyPlugin.ObjectPattern}
   */
  function makePatternObject(input: string): CopyPlugin.ObjectPattern {
    /**
     * Process raw user input.
     *
     * - Replace leading dot with project path
     * - Append wildcard glob to directory requests
     */
    const from = fromDotRel(input)

    return {
      from: from,
      to: app.path('@name'),
      context: input.startsWith('/') ? undefined : app.path('@src'),
      noErrorOnMissing: true,
    }
  }

  /**
   * Handle tuple set
   *
   * @param tuple - [origin, destination]
   * @returns
   */
  const makeFromTo = (input: [string, string]) => {
    let [from, to] = input

    /**
     * Process raw user input.
     *
     * - Replace leading dot with project path
     * - Append wildcard glob to directory requests
     */
    from = fromDotRel(from)

    return {
      from,
      to: to ? join(to, app.path('@name')) : app.path('@name'),
      context: app.path('@src'),
      noErrorOnMissing: true,
    }
  }

  /**
   * Parse a request item
   */
  const parse = (request: string | CopyPlugin.ObjectPattern) => {
    return isString(request) ? makePatternObject(request) : request
  }

  if (appearsTupled(request)) {
    app.extensions.get('copy-webpack-plugin').setOptions(options => ({
      ...(options ?? {}),
      patterns: [
        ...(options?.patterns ?? []),
        ...request.flat().map(makeFromTo),
      ],
    }))

    return app
  }

  app.extensions.get('copy-webpack-plugin').setOptions(options => ({
    ...(options ?? {}),
    patterns: [...(options?.patterns ?? []), ...request.flat().map(parse)],
  }))

  return app
}
