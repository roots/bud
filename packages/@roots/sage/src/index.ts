// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * This preset configures Bud for use with the Sage starter theme
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import {Sage} from './Sage'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/sage': typeof Sage
  }
}

export const {name, register} = Sage
