// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * Add solid.js to Bud
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud

 * @extension @packageDocumentation @betaDocumentation
 */

import type {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Extensions {
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
