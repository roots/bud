import type {extractCss} from './api/extract.js'
import type {BudCriticalCss} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    critical: {
      set: BudCriticalCss[`set`]
      setOptions: BudCriticalCss[`setOptions`]
      get: BudCriticalCss[`get`]
      getOptions: BudCriticalCss[`getOptions`]
      options: BudCriticalCss[`options`]
      enable: BudCriticalCss[`enable`]
      enabled: BudCriticalCss[`enabled`]
      extract: BudCriticalCss[`extract`]
      width: BudCriticalCss[`width`]
      height: BudCriticalCss[`height`]
      request: BudCriticalCss[`request`]
      base: BudCriticalCss[`base`]
      ignore: BudCriticalCss[`ignore`]
      html: BudCriticalCss[`html`]
      src: BudCriticalCss[`src`]
    }
    extractCss: extractCss
  }

  interface Modules {
    '@roots/bud-criticalcss': Bud[`critical`]
  }
}
