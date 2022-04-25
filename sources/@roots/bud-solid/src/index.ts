// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add solid.js to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import '@roots/bud-babel/types/env'

import type {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-solid': BudSolidExtension
  }
}

type BudSolidExtension = Extension

const BudSolidExtension: BudSolidExtension = {
  label: '@roots/bud-solid',

  dependsOn: new Set(['@roots/bud-babel']),

  async boot(_, {babel}) {
    babel.setPreset(
      'babel-preset-solid',
      require.resolve('babel-preset-solid'),
    )
  },
}

export const {label, boot, dependsOn} = BudSolidExtension
