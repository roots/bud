/**
 * Adds Emotion to `@roots/bud`
 *
 * @packageDocumentation
 */

import {BudEmotionExtension} from './BudEmotionExtension'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/bud-emotion': BudEmotionExtension
    }
  }
}

export const {name, boot} = BudEmotionExtension
