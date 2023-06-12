import {InputError} from '@roots/bud-support/errors'
import {isAbsolute} from 'node:path'

import type {Bud} from '../../index.js'
import type {SyncRegistry} from '../../types/registry/index.js'

import * as isType from './isType.js'
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
  if (isType.baseDir(parameters)) {
    const basedir = validate.baseDir(parameters)
    this.context.basedir = basedir
    this.log(`basedir set to ${basedir}`)

    return this
  }

  /* Setter */
  const setHookValue = makeCallback(this)

  /* Set path from key, value */
  if (isType.stringPair(parameters)) {
    if (parameters[0] === `@storage`) {
      this.warn(
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
  if (isType.pathMap(parameters)) {
    Object.entries(parameters[0]).map(setHookValue)
    return this
  }

  throw new InputError(`Invalid parameters passed to bud.setPath`, {
    props: {
      docs: new URL(`https://bud.js.org/docs/bud.setPath`),
      isBudError: true,
      thrownBy: `bud.setPath`,
    },
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

    bud.hooks
      .on(`location.${key}` as keyof SyncRegistry, normal)
      .log(`${key} set to ${normal}`)
      .info({key, normal, value})

    bud.hooks.async(`build.resolve.alias`, async (paths = {}) => ({
      ...paths,
      [key]: isAbsolute(value) ? value : bud.path(value),
    }))

    return bud
  }
