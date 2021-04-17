import '@roots/bud-postcss'
import {Module} from '@roots/bud-framework'
import {RuleSetRule, RuleSetUseItem} from 'webpack'

/**
 * Let sass know it isnt in the browser.
 */
declare global {
  interface navigator {}
}

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-sass': Module
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      /**
       * @roots/bud-sass Loader
       */
      sass: string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      /**
       * @roots/bud-sass RuleSetLoader
       */
      sass: RuleSetRule
    }
  }

  namespace Hooks.Rule {
    interface Definitions {
      /**
       * @roots/bud-sass RuleSetRule
       */
      sass: RuleSetUseItem
    }
  }
}
