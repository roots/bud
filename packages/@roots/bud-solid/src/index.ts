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
import {safeRequire} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-solid': BudSolidExtension
  }
}

type BudSolidExtension = Extension.Module

const BudSolidExtension: BudSolidExtension = {
  name: '@roots/bud-solid',
  boot({babel, warn}) {
    !safeRequire('babel-preset-solid') &&
      warn(
        'babel-preset-solid is required by @roots/bud-solid-js but is not resolvable.',
      )

    babel.setPreset(
      'babel-preset-solid',
      require.resolve('babel-preset-solid'),
    )
  },
}

export const {name, boot} = BudSolidExtension
