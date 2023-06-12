import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type {extractCss} from './api/extract.js'
import type BudCriticalCssExtension from './extension.js'

interface CriticalPublicAPI
  extends PublicExtensionApi<BudCriticalCssExtension> {
  base: BudCriticalCssExtension[`base`]
  extract: BudCriticalCssExtension[`extract`]
  height: BudCriticalCssExtension[`height`]
  html: BudCriticalCssExtension[`html`]
  ignore: BudCriticalCssExtension[`ignore`]
  request: BudCriticalCssExtension[`request`]
  src: BudCriticalCssExtension[`src`]
  width: BudCriticalCssExtension[`width`]
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
