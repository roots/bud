import {isAbsolute, join, parse, relative} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import type {Plugin as CopyPlugin} from '@roots/bud-support/copy-webpack-plugin'

type FromToTuple = [string, string]

export type Parameters = [
  (
    | string
    | CopyPlugin.ObjectPattern
    | Array<string | FromToTuple | CopyPlugin.ObjectPattern>
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
  const app = this as Bud

  const makePatternObjectFromString = fromStringFactory(app, overrides)
  const makePatternObjectFromTuple = fromTupleFactory(app, overrides)
  const arrayedRequest = !Array.isArray(request) ? [request] : request

  const valueMapper = (
    item: string | FromToTuple | CopyPlugin.ObjectPattern,
  ) => {
    if (typeof item === `string`) {
      return makePatternObjectFromString(item)
    }
    if (Array.isArray(item)) {
      return makePatternObjectFromTuple(...item)
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
 */
export const fromStringFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  (from: string): CopyPlugin.ObjectPattern => {
    from = isAbsolute(from)
      ? relative(app.path(`@src`), from)
      : app.relPath(from)
    from = parse(from).ext?.length > 0 ? from : join(from, `**`, `*`)

    return {
      from,
      to: app.relPath(`@file`),
      context: app.path(`@src`),
      noErrorOnMissing: true,
      globOptions: {dot: false},
      ...overrides,
    }
  }

/**
 * Take an input [from,to] tuple and return a {@link CopyPlugin.ObjectPattern}
 */
export const fromTupleFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  (from: string, to: string): CopyPlugin.ObjectPattern => {
    from = isAbsolute(from)
      ? relative(app.path(`@src`), from)
      : app.relPath(from)

    to = isAbsolute(to) ? relative(app.path(`@dist`), to) : app.relPath(to)
    to =
      parse(from).ext?.length > 0 || to.includes(`[`)
        ? to
        : app.relPath(to, `@file`)

    return {
      from,
      to,
      context: app.path(`@src`),
      noErrorOnMissing: true,
      globOptions: {dot: false},
      ...overrides,
    }
  }
