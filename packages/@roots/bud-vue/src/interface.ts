import {Module} from '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'
import {RuleSetRule, RuleSetUseItem} from 'webpack'

declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-vue': Module
      'vue-loader-plugin': Module
    }
  }

  namespace Hooks.Loader {
    interface Definitions {
      vue: string
      'vue-style': string
    }
  }

  namespace Hooks.Item {
    interface Definitions {
      vue: RuleSetUseItem
      'vue-style': RuleSetUseItem
    }
  }

  namespace Hooks.Rule {
    interface Definitions {
      vue: RuleSetRule
    }
  }
}
