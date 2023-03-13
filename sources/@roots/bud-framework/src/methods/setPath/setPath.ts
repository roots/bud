import {isAbsolute} from 'node:path'

import type {Bud} from '../../bud.js'
import type {SyncRegistry} from '../../types/registry/index.js'
import * as isType from './isType.js'
import * as validate from './validate.js'

export type Parameters =
  | [string]
  | [string, string]
  | [Record<string, string>]

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
    this.context.logger.log(`bud.setPath`, `basedir set to ${basedir}`)

    return this
  }

  /* Setter */
  const setHookValue = makeCallback(this)

  /* Set path from key, value */
  if (isType.stringPair(parameters)) {
    setHookValue(parameters)
    return this
  }

  /* Set multiple paths */
  if (isType.pathMap(parameters)) {
    Object.entries(parameters[0]).map(setHookValue)
    return this
  }

  const error = new Error(
    `Invalid parameters passed.\n\nDocs: https://bud.js.org/docs/bud.setPath`,
  )
  error.name = `bud.setPath`
  throw error
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

    return bud
  }
