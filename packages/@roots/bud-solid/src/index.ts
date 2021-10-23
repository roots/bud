// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Add solid.js to Bud
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

import type {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-solid': BudSolidExtension
  }
}

interface BudSolidExtension extends Extension.Module {}

const BudSolidExtension: BudSolidExtension = {
  name: '@roots/bud-solid',
  boot({babel, project}) {
    project.hasPeerDependency('solid-js') &&
      babel.setPreset('babel-preset-solid')
  },
}

export const {name, boot} = BudSolidExtension
