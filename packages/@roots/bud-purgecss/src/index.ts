// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds purgecss support to Bud
 *
 * @remarks
 * Requires {@link @roots/bud-postcss# | @roots/bud-postcss} to be installed
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

import {Extension} from '@roots/bud-framework'

import {purge} from './bud.purge'

declare module '@roots/bud-framework' {
  interface Framework {
    purge: purge
  }

  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-purgecss': Extension.Module
  }
}

export const name = '@roots/bud-purgecss'
export const api = {purge}
