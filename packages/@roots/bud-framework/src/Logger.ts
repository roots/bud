/**
 * @module @roots/bud-framework
 */

import {Signale} from 'signale'

import {Bootstrapper} from '.'

/**
 * @interface Logger
 */
export interface Logger extends Bootstrapper {
  instance: Signale
}
