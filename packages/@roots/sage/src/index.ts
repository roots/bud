// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * The {@link @roots/sage# | @roots/sage preset} configures Bud for use
 * with the Sage starter theme
 *
 * @see https://github.com/roots/bud
 * @see https://github.com/roots/sage
 *
 * @remarks
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {Sage} from './Sage'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Extensions}
   *
   * @public @override
   */
  interface Extensions {
    /**
     * {@inheritDoc @roots/sage#Sage}
     *
     * @public
     */
    '@roots/sage': Sage
  }
}

export const {name, boot} = Sage
