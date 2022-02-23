// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds tailwindcss support to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import './typings.js'

import {BudTailwindCssExtension} from './tailwind.extension'

export const {label: name, boot} = BudTailwindCssExtension
