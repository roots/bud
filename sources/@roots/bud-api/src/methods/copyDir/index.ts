import type {Bud} from '@roots/bud-framework'
import type {Plugin as CopyPlugin} from '@roots/bud-support/copy-webpack-plugin'

import isString from '@roots/bud-support/lodash/isString'
import {isAbsolute} from 'node:path'

type FromToTuple = [string, string]

export type Parameters = [
  FromToTuple | string,
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
  const makePatternObjectFromString = fromStringFactory(this, overrides)
  const makePatternObjectFromTuple = fromTupleFactory(this, overrides)

  if (!context) context = this.path(`@src`)
  if (!isAbsolute(context)) context = this.path(context)

  const result = isString(request)
    ? makePatternObjectFromString(request, context)
    : makePatternObjectFromTuple(...request, context)

  this.extensions
    .get(`@roots/bud-extensions/copy-webpack-plugin`)
    .setPatterns((patterns = []) => [...patterns, result])

  this.api.logger.success(`bud.copyDir: asset pattern added`)

  return this
}

/**
 * Take an input string and return a {@link CopyPlugin.ObjectPattern}
 */
export const fromStringFactory =
  (app: Bud, overrides: Partial<CopyPlugin.ObjectPattern>) =>
  (from: string, context: string): CopyPlugin.ObjectPattern => ({
    context,
    from: app.relPath(from),
    globOptions: {dot: false},
    to: app.relPath(from, `@file`),
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
    context,
    from: app.relPath(from),
    globOptions: {dot: false},
    to: app.relPath(to, `@file`),
    ...overrides,
  })
