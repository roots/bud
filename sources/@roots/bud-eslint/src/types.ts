/// <reference types="@roots/bud" />

import type BudEslintCacheFix from './cache-fix/index.js'
import type {BudEslint} from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: {
      /**
       * Fix issues with persistent caching
       */
      cacheFix: BudEslint[`cacheFix`]
      enable: BudEslint[`enable`]
      enabled: BudEslint[`enabled`]
      get: BudEslint[`get`]
      getOption: BudEslint[`getOption`]
      getOptions: BudEslint[`getOptions`]
      set: BudEslint[`set`]
      setOption: BudEslint[`setOption`]
      setOptions: BudEslint[`setOptions`]

      /**
       * @deprecated - Use {@link Extension.set} instead
       *
       * @example
       * ```js
       * bud.eslint.set('fix', true)
       * ```
       */
      fix: BudEslint[`fix`]
    }
  }

  interface Modules {
    '@roots/bud-eslint': Bud[`eslint`]
    '@roots/bud-eslint/cache-fix': BudEslintCacheFix
  }
}
