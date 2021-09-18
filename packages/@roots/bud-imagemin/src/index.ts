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
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudImageMinExtension} from './BudImageMinExtension'
import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Framework}
   * @public @override
   */
  interface Framework {
    /**
     * Manage image minimizer plugins and options
     *
     * @public
     */
    imagemin: Config
  }

  /**
   * {@inheritDoc @roots/bud-framework#Plugins}
   * @public @override
   */
  interface Plugins {
    '@roots/bud-imagemin': BudImageMinPlugin
    'image-minimizer-webpack-plugin': BudImageMinPlugin
  }

  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-imagemin': BudImageMinExtension
  }
}

export const {name, api, register, boot} = BudImageMinExtension
export type {Config}
