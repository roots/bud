import type {Bud} from '@roots/bud-framework'
import type {Plugin as CopyPlugin} from '@roots/bud-support/copy-webpack-plugin'
import {isAbsolute} from 'path'

type FromToTuple = [string, string]

export type Parameters = [
  string | FromToTuple,
  string?,
  Partial<CopyPlugin.ObjectPattern>?,
]

export interface copyDir {
  (...parameters: Parameters): Promise<Bud>
}

export const copyDir: copyDir = async function copyDir(
  this: Bud,
  request,
  context,
  overrides = {},
) {
  const app = this as Bud
  const makePatternObjectFromString = fromStringFactory(app, overrides)
  const makePatternObjectFromTuple = fromTupleFactory(app, overrides)

  if (!context) context = app.path(`@src`)
  if (!isAbsolute(context)) context = app.path(context)

  const result =
    typeof request === `string`
      ? makePatternObjectFromString(request, context)
      : makePatternObjectFromTuple(...request, context)

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
 */
export const fromStringFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  (from: string, context: string): CopyPlugin.ObjectPattern => ({
    from: app.relPath(from),
    to: app.relPath(from, `@file`),
    context,
    globOptions: {dot: false},
    ...overrides,
  })

/**
 * Take an input [from, to] tuple and return a {@link CopyPlugin.ObjectPattern}
 */
export const fromTupleFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  (
    from: string,
    to: string,
    context: string,
  ): CopyPlugin.ObjectPattern => ({
    from: app.relPath(from),
    to: app.relPath(to, `@file`),
    context,
    globOptions: {dot: false},
    ...overrides,
  })
