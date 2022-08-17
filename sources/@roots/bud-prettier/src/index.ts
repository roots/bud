// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds prettier support to Bud
 *
 * @beta
 * This extension  only adds Prettier as a managed dependency of the Bud framework.
 * It does not add any additional functionality or tie into the build process.
 *
 * It will be developed further as the Framework matures.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-prettier': Extension
  }
}

@label(`@roots/bud-prettier`)
export default class BudPrettier extends Extension {}
