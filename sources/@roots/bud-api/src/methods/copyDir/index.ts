import type {Bud} from '@roots/bud-framework'
import type {Plugin as CopyPlugin} from '@roots/bud-support/copy-webpack-plugin'
import {isAbsolute, join} from 'path'

type FromToTuple = [CopyPlugin.StringPattern, CopyPlugin.StringPattern]

export type Parameters = [
  CopyPlugin.StringPattern | FromToTuple,
  Partial<CopyPlugin.ObjectPattern>?,
]

export interface copyDir {
  (...parameters: Parameters): Promise<Bud>
}

export const copyDir: copyDir = async function copyDir(
  this: Bud,
  request,
  overrides = {},
) {
  const app = this as Bud

  const makePatternObjectFromString = fromStringFactory(app, overrides)
  const makePatternObjectFromTuple = fromTupleFactory(app, overrides)

  const result =
    typeof request === `string`
      ? makePatternObjectFromString(request)
      : makePatternObjectFromTuple(request)

  app.extensions
    .get(`@roots/bud-extensions/copy-webpack-plugin`)
    .setOptions(options => ({
      ...(options ?? {}),
      patterns: [...(options?.patterns ?? []), result],
    }))

  app.api.logger.success(`bud.copyDir: asset pattern added`)

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
    from: join(`**`, `*`),
    to: app.path(`@file`),
    context: isAbsolute(from) ? from : app.path(from),
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
    from: join(`**`, `*`),
    to: join(to, app.path(`@base`)),
    context: isAbsolute(from) ? from : app.path(from),
    ...overrides,
  })
