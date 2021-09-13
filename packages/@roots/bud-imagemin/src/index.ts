// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Imagemin adapter for Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * Add image optimization support to Bud projects
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
