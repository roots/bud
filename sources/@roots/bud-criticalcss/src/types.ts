/// <reference types="@roots/bud-framework" />

import type {extractCss} from './api/extract.js'
import type BudCriticalCssExtension from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    critical: {
      set: BudCriticalCssExtension[`set`]
      setOptions: BudCriticalCssExtension[`setOptions`]
      get: BudCriticalCssExtension[`get`]
      getOptions: BudCriticalCssExtension[`getOptions`]
      options: BudCriticalCssExtension[`options`]
      enable: BudCriticalCssExtension[`enable`]
      enabled: BudCriticalCssExtension[`enabled`]
      extract: BudCriticalCssExtension[`extract`]
      width: BudCriticalCssExtension[`width`]
      height: BudCriticalCssExtension[`height`]
      request: BudCriticalCssExtension[`request`]
      base: BudCriticalCssExtension[`base`]
      ignore: BudCriticalCssExtension[`ignore`]
      html: BudCriticalCssExtension[`html`]
      src: BudCriticalCssExtension[`src`]
    }
    extractCss: extractCss
  }

  interface Modules {
    '@roots/bud-criticalcss': Bud[`critical`]
  }
}
