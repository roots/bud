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

import {Config} from './imagemin.config'
import {BudImageMinExtension} from './imagemin.extension'
import {BudImageMinPlugin} from './imagemin.plugin'

declare module '@roots/bud-framework' {
  interface Framework {
    imagemin: Config
  }

  interface Plugins {
    '@roots/bud-imagemin': typeof BudImageMinPlugin
    'image-minimizer-webpack-plugin': typeof BudImageMinPlugin
  }

  interface Modules {
    '@roots/bud-imagemin': typeof BudImageMinExtension
  }
}

export const {name, mixin, register, boot} = BudImageMinExtension
