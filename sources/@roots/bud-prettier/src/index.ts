// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds prettier support to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './types.js'

import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-prettier`)
export default class BudPrettier extends Extension {}
