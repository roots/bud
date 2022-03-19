// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds tailwindcss support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './typings'

import {BudTailwindCssExtension} from './tailwind.extension'

export const name = BudTailwindCssExtension.label
export const boot = BudTailwindCssExtension.boot
