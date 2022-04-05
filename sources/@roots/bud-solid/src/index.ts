// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add solid.js to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-babel'

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
