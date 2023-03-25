import {isAbsolute} from 'node:path'

import {InputError} from '@roots/bud-support/errors'

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
    this.log(`basedir set to ${basedir}`)

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

  throw new InputError(`Invalid parameters passed to bud.setPath`, {
    props: {
      thrownBy: `bud.setPath`,
      docs: new URL(`https://bud.js.org/docs/bud.setPath`),
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

    bud.log({
      key,
      value,
      normal,
    })

    bud.hooks
      .on(`location.${key}` as keyof SyncRegistry, normal)
      .log(`${key} set to ${normal}`)

    return bud
  }
