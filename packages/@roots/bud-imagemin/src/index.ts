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
 * @packageDocumentation @betaDocumentation
 */

import {BudImageMinExtension} from './BudImageMinExtension'
import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

declare module '@roots/bud-framework' {
  interface Framework {
    imagemin: Config
  }

  interface Plugins {
    '@roots/bud-imagemin': BudImageMinPlugin
    'image-minimizer-webpack-plugin': BudImageMinPlugin
  }

  interface Modules {
    '@roots/bud-imagemin': BudImageMinExtension
  }
}

export const {name, api, register, boot} = BudImageMinExtension
