// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds prettier support to Bud
 *
 * @beta
 * This extension should is stable but it only adds Prettier as a managed dependency of the Bud framework.
 * It does not add any aditional functionality or tie into the build process.
 *
 * It will be developed further as the Framework matures.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    /**
     * Prettier extension
     *
     * @beta
     */
    '@roots/bud-prettier': Extension.Module
  }
}

/**
 * {@link @roots/bud-prettier# | @roots/bud-prettier} extension
 *
 * @remarks
 * This plugin really only adds prettier as a managed dependency of Bud.
 * It does not add any additional functionality to Bud.
 *
 * @beta
 */
const extension: Extension.Module = {
  name: '@roots/bud-prettier',
}

export const {name} = extension
