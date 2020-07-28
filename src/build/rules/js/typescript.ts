import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import type {Bud} from '../../types'

const typescript: Function = (bud: Bud): any => ({
  bud,

  rule: {},

  make: function () {
    this.pre()

    this.rule = {
      test: patterns.ts,
      exclude: patterns.vendor,
      use: [
        {
          loader: loaders.ts,
          options: {
            configFile: bud.state.configs.typescript,
          },
        },
      ],
    }

    this.bud.state.options.target == 'node'
      && this.rule.use.push(loaders.shebang)

    this.post()

    return this.rule
  },

  /**
   * Hook: pre_typescript
   */
  pre: function () {
    this.bud.hooks.call('pre_typescript', this)
  },

  /**
   * Hook: post_typescript
   */
  post: function () {
    this.bud.hooks.call('post_typescript', this.rule)
  },
})

export {typescript}
