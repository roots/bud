import type {Bud} from '@roots/bud-framework'
import type CopyPlugin from 'copy-webpack-plugin'
import {isArray, isString} from 'lodash-es'

export interface facade {
  (
    request:
      | string
      | [string, string]
      | CopyPlugin.ObjectPattern
      | Array<string | [string, string] | CopyPlugin.ObjectPattern>,
  ): Bud
}

export interface method {
  (
    request:
      | string
      | [string, string]
      | CopyPlugin.ObjectPattern
      | Array<string | [string, string] | CopyPlugin.ObjectPattern>,
  ): Promise<Bud>
}

export const appearsTupled = (request: any): boolean =>
  isArray(request) && isArray(request[0])

export const assets: method = async function assets(
  request:
    | string
    | [string, string]
    | CopyPlugin.ObjectPattern
    | Array<string | [string, string] | CopyPlugin.ObjectPattern>,
): Promise<Bud> {
  /**
   * tsc will complain about `this` context being lost
   * when destructuring bud even though the context of
   * this function will be bound.
   */
  const app = this as Bud

  /**
   * Take an input string and return a {@link CopyPlugin.ObjectPattern}
   */
  function makePatternObject(from: string): CopyPlugin.ObjectPattern {
    return {
      from: from.startsWith(`/`) ? from : app.path(`@src`, from),
      to: app.path(`@dist`, from, `@file`),
      context: app.path(`@src`),
      noErrorOnMissing: true,
      toType: `template`,
    }
  }

  /**
   * Handle tuple set
   *
   * @param tuple - [origin, destination]
   * @returns
   */
  const makeFromTo = ([from, to]: [string, string]) => {
    to = to ?? from
    return {
      from: from.startsWith(`/`) ? from : app.path(`@src`, from),
      to: to.startsWith(`/`) ? to : app.path(`@dist`, to, `@file`),
      context: app.path(`@src`),
      noErrorOnMissing: true,
      toType: `template`,
    }
  }

  /**
   * Parse a request item
   */
  const parse = (
    request: string | [string, string] | CopyPlugin.ObjectPattern,
  ) => {
    return isString(request)
      ? makePatternObject(request)
      : isArray(request)
      ? makeFromTo(request)
      : request
  }

  /**
   * Handle string request
   */
  if (isString(request)) {
    app.extensions.get(`copy-webpack-plugin`).setOptions(options => ({
      ...(options ?? {}),
      patterns: [...(options?.patterns ?? []), parse(request)],
    }))

    return app
  }

  /**
   * Handle object request
   */
  if (!isArray(request)) {
    app.extensions.get(`copy-webpack-plugin`).setOptions(options => ({
      ...(options ?? {}),
      patterns: [...(options?.patterns ?? []), request],
    }))

    return app
  }

  /**
   * Handle arrayed request
   */
  app.extensions.get(`copy-webpack-plugin`).setOptions(options => ({
    ...(options ?? {}),
    patterns: [...(options?.patterns ?? []), ...request.map(parse)],
  }))

  return app
}
