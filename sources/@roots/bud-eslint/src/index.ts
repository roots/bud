// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Provides eslint integration for Bud.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './env'

import {BudEslintWebpackPlugin} from './eslint.extension'

export const {label, options, register, make} = BudEslintWebpackPlugin
