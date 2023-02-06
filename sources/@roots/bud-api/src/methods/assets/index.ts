import {isAbsolute, relative, sep} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import type {Plugin as CopyPlugin} from '@roots/bud-support/copy-webpack-plugin'

type FromToTuple = [CopyPlugin.StringPattern, CopyPlugin.StringPattern]

export type Parameters = [
  (
    | CopyPlugin.StringPattern
    | CopyPlugin.ObjectPattern
    | Array<CopyPlugin.StringPattern>
    | Array<FromToTuple>
    | Array<CopyPlugin.ObjectPattern>
  ),
  Partial<CopyPlugin.ObjectPattern>?,
]

export interface assets {
  (...parameters: Parameters): Promise<Bud>
}

export const assets: assets = async function assets(
  this: Bud,
  request,
  overrides = {},
) {
  /**
   * tsc will complain about `this` context being lost
   * when destructuring bud even though the context of
   * this function will be bound.
   */
  const app = this as Bud

  const makePatternObjectFromString = fromStringFactory(app, overrides)
  const makePatternObjectFromTuple = fromTupleFactory(app, overrides)

  const arrayedRequest = !Array.isArray(request) ? [request] : request

  const valueMapper = (
    item:
      | CopyPlugin.StringPattern
      | FromToTuple
      | CopyPlugin.ObjectPattern,
  ) => {
    if (typeof item === `string`) {
      const copyPluginStringPattern = item
      return makePatternObjectFromString(copyPluginStringPattern)
    }
    if (Array.isArray(item)) {
      const tuple: FromToTuple = item
      return makePatternObjectFromTuple(tuple)
    }
    return {...item, ...overrides}
  }

  app.extensions
    .get(`@roots/bud-extensions/copy-webpack-plugin`)
    .setOptions(options => ({
      ...(options ?? {}),
      patterns: [
        ...(options?.patterns ?? []),
        ...arrayedRequest.map(valueMapper),
      ],
    }))

  app.api.logger.success(
    `bud.copy: ${arrayedRequest.length} asset patterns added`,
  )

  return app
}

/**
 * Take an input string and return a {@link CopyPlugin.ObjectPattern}
 *
 * @internal
 */
export const fromStringFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  (from: string): CopyPlugin.ObjectPattern => ({
    from: isAbsolute(from) ? from : app.path(`@src`, from),
    to: isAbsolute(from)
      ? relative(app.path(`@src`), from)
      : app.path(`@dist`, from, `@file`),
    context: app.path(`@src`),
    filter: filterDotFiles,
    noErrorOnMissing: true,
    toType: `template`,
    ...overrides,
  })

/**
 * Take an input [from,to] tuple and return a {@link CopyPlugin.ObjectPattern}
 *
 * @internal
 */
export const fromTupleFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  ([from, to]: [string, string]): CopyPlugin.ObjectPattern => ({
    from: isAbsolute(from) ? from : app.path(`@src`, from),
    to: isAbsolute(to) ? to : app.path(`@dist`, to, `@file`),
    filter: filterDotFiles,
    context: app.path(`@src`),
    noErrorOnMissing: true,
    toType: `template`,
    ...overrides,
  })

const filterDotFiles = (resourcePath: string) =>
  !resourcePath.split(sep).pop()?.startsWith(`.`)
