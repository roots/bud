// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Add image optimization support to Bud projects
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import {imagemin} from './imagemin.config'
import * as BudImagemin from './imagemin.extension'

declare module '@roots/bud-framework' {
  interface Framework {
    imagemin: imagemin
  }

  interface Modules {
    '@roots/bud-imagemin': typeof BudImagemin
  }
}

export const {name, options, register, boot} = BudImagemin
