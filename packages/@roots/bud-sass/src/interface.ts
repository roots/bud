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
  namespace Framework {
    interface Extensions {
      '@roots/bud-sass': Module
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      sass: string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      sass: RuleSetRule
    }
  }

  namespace Hooks.Rule {
    interface Definitions {
      sass: RuleSetUseItem
    }
  }
}
