// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * The `@roots/bud-emotion` package adds emotioncss support to {@link @roots/bud-framework# | the Framework}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {BudEmotionExtension} from './BudEmotionExtension'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-emotion': BudEmotionExtension
  }
}

export const {name, boot} = BudEmotionExtension
