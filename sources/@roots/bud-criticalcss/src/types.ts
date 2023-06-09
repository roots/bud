import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {extractCss} from './api/extract.js'
import type BudCriticalCssExtension from './extension.js'

interface CriticalPublicAPI
  extends PublicExtensionApi<BudCriticalCssExtension> {
  extract: BudCriticalCssExtension[`extract`]
  width: BudCriticalCssExtension[`width`]
  height: BudCriticalCssExtension[`height`]
  request: BudCriticalCssExtension[`request`]
  base: BudCriticalCssExtension[`base`]
  ignore: BudCriticalCssExtension[`ignore`]
  html: BudCriticalCssExtension[`html`]
  src: BudCriticalCssExtension[`src`]
}

declare module '@roots/bud-framework' {
  interface Bud {
    critical: CriticalPublicAPI
    extractCss: extractCss
  }

  interface Modules {
    '@roots/bud-criticalcss': CriticalPublicAPI
  }
}
