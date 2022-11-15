import type {Bud} from '@roots/bud-framework'

import {isNamed, isNormalRecord, isPrimitive, isRecord} from './guards.js'
import {handleFallthrough} from './handleFallthrough.js'
import {handleNamed} from './handleNamed.js'
import {handleNormalRecord} from './handleNormalRecord.js'
import {handlePrimitive} from './handlePrimitive.js'
import {handleSimpleRecord} from './handleSimpleRecord.js'
import type {Parameters} from './types.js'

/**
 * `bud.entry` input parameters
 *
 * @public
 */
export type {Parameters}

/**
 * @internal
 */
export interface entry {
  (...parameters: Parameters): Promise<Bud>
}

/**
 * ## bud.entry
 *
 * Indicate application entrypoint(s)
 *
 * @see {@link https://bud.js.org/docs/bud.entry}
 *
 * @example
 * ```js
 * bud.entry('@src/index.js')
 * ```
 *
 * @example
 * ```js
 * bud.entry(['@src/index.js', '@src/another.js'])
 * ```
 *
 * @example
 * ```js
 * bud.entry('app', '@src/index.js')
 * ```
 *
 * @example
 * ```js
 * bud.entry({
 *   app: ['@src/index.js'],
 *   admin: ['@src/admin.js'],
 * })
 * ```
 *
 * @example
 * ```js
 * bud.entry({
 *  app: {
 *    import: ['@src/index.js'],
 *    dependOn: 'shared',
 *  },
 *  admin: {
 *    import: ['@src/admin.js'],
 *    dependOn: 'shared',
 *  },
 *  shared: {
 *    import: ['lodash'],
 *  },
 * })
 * ```
 *
 * @public
 */
export const entry: entry = async function (this: Bud, ...input) {
  if (isPrimitive(input)) {
    return await handlePrimitive(this, input)
  }

  if (isNamed(input)) {
    return await handleNamed(this, input)
  }

  if (isNormalRecord(input)) {
    return await handleNormalRecord(this, input)
  }

  if (isRecord(input)) {
    return await handleSimpleRecord(this, input)
  }

  return await handleFallthrough(this, input)
}
