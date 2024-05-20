// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * @see {@link https://npmjs.com/package/@roots/critical-css-webpack-plugin}
 */

import type {extractCss} from '@roots/bud-criticalcss/bud.extractCss'
import type {ExtensionApi} from '@roots/bud-framework/extension'

import BudCriticalCssExtension from '@roots/bud-criticalcss/extension'

interface CriticalPublicAPI
  extends ExtensionApi<
    {
      base: BudCriticalCssExtension[`base`]
      extract: BudCriticalCssExtension[`extract`]
      height: BudCriticalCssExtension[`height`]
      html: BudCriticalCssExtension[`html`]
      ignore: BudCriticalCssExtension[`ignore`]
      request: BudCriticalCssExtension[`request`]
      src: BudCriticalCssExtension[`src`]
      width: BudCriticalCssExtension[`width`]
    },
    BudCriticalCssExtension
  > {}

declare module '@roots/bud-framework' {
  interface Bud {
    critical: CriticalPublicAPI
    extractCss: extractCss
  }

  interface Modules {
    '@roots/bud-criticalcss': CriticalPublicAPI
  }
}

export default BudCriticalCssExtension
