// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add image optimization support to Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'

import {imagemin} from './imagemin.config'
import * as BudImagemin from './imagemin.extension'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: imagemin
  }

  interface Modules {
    '@roots/bud-imagemin': typeof BudImagemin
  }
}

/**
 * @public
 */
export const label: Extension.Module['label'] = BudImagemin.label

/**
 * @public
 */
export const options: Extension.Module['options'] = BudImagemin.options

/**
 * @public
 */
export const register: Extension.Module['register'] = BudImagemin.register

/**
 * @public
 */
export const boot: Extension.Module['boot'] = BudImagemin.boot
