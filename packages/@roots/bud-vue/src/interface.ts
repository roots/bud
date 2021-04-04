import '@roots/bud-framework'
import '@roots/bud-api'
import '@roots/bud-babel'
import {RuleSetRule, RuleSetUseItem} from 'webpack'

declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-vue': any
      'vue-loader-plugin': any
    }
  }

  namespace Framework.Hooks.Loader {
    interface Definitions {
      vue: string
      'vue-style': string
    }
  }

  namespace Framework.Hooks.Item {
    interface Definitions {
      vue: RuleSetUseItem
      'vue-style': RuleSetUseItem
    }
  }

  namespace Framework.Hooks.Rule {
    interface Definitions {
      vue: RuleSetRule
    }
  }
}
