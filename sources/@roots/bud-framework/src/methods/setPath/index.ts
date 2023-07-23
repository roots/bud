import type {Bud} from '@roots/bud-framework'
import type {SyncRegistry} from '@roots/bud-framework/registry'

import {isAbsolute} from 'node:path'

import {InputError} from '@roots/bud-support/errors'
import logger from '@roots/bud-support/logger'

import * as validate from './validate.js'

export type Parameters =
  | [Record<string, string>]
  | [string, string]
  | [string]

export interface setPath {
  (...parameters: Parameters): Bud
}

/**
 * Set a project path.
 *
 * @remarks
 * All values should be relative to the project directory.
 *
 * @example
 * Set project path
 * ```js
 * bud.setPath('/app/absolute/path/')
 * ```
 *
 * @example
 * ```js
 * bud.setPath('@src', 'custom/src')
 * ```
 */
export const setPath: setPath = function (this: Bud, ...parameters) {
  /* Validate parameters */
  parameters = validate.all(parameters)

  /* Set basedir */
  if (baseDir(parameters)) {
    const basedir = validate.baseDir(parameters)
    this.context.basedir = basedir
    logger.log(`basedir set to ${basedir}`)

    return this
  }

  /* Setter */
  const setHookValue = makeCallback(this)

  /* Set path from key, value */
  if (stringPair(parameters)) {
    if (parameters[0] === `@storage`) {
      logger.warn(
        `bud.setPath: @storage must be set by args or env\n\n`,
        `The @storage path may be set by the \`--storage\` argument or the \`APP_STORAGE_PATH\` environment variable. It cannot be set after bud.js is bootstrapped.`,
        `In the future this will throw an error.\n\nFor now, you may encounter problems with caching and other features which read and write to \`@storage\`, as there have
        already been files written to ${this.path(`@storage`)}`,
      )
    }

    setHookValue(parameters)
    return this
  }

  /* Set multiple paths */
  if (pathMap(parameters)) {
    Object.entries(parameters[0]).map(setHookValue)
    return this
  }

  throw new InputError(`Invalid parameters passed to bud.setPath`, {
    docs: new URL(`https://bud.js.org/docs/bud.setPath`),
    thrownBy: `bud.setPath`,
  })
}

/**
 * Make {@link Bud.hooks} callback
 */
const makeCallback =
  (bud: Bud) =>
  (pair: [string, string]): Bud => {
    const [key, value] = validate.stringPair(pair)
    const normal = !isAbsolute(value) ? bud.relPath(value) : value

    bud.hooks.on(`location.${key}` as keyof SyncRegistry, normal)
    logger.log(key, `set to`, normal)

    bud.hooks.async(`build.resolve.alias`, async (paths = {}) => ({
      ...paths,
      [key]: isAbsolute(value) ? value : bud.path(value),
    }))

    return bud
  }

/**
 * Is basedir?
 */
const baseDir = (params: Parameters): params is [string] => {
  return params.length < 2 && typeof params[0] === `string`
}

/**
 * Is string pair?
 */
const stringPair = (params: Parameters): params is [string, string] => {
  return params.length === 2
}

/**
 * Is path object?
 */
const pathMap = (
  params: Parameters,
): params is [Record<string, string>] => {
  return params.length === 1 && typeof params[0] === `object`
}
