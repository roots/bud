// Copyright (c) Roots Foundation, LLC. All rights reserved. Licensed under the MIT license.

/**
 * The `@roots/bud-emotion` package adds emotioncss support to {@link @roots/bud-framework# | the Framework}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {BudEmotionExtension} from './BudEmotionExtension'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   *
   * @public @override
   */
  interface Modules {
    /**
     * @see {@link BudEmotionExtension}
     *
     * @public
     */
    '@roots/bud-emotion': BudEmotionExtension
  }
}

export const {name, boot} = BudEmotionExtension
