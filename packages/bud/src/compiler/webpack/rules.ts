import type {Bud} from '../..'
import type {WebpackModule, WebpackRule} from '@roots/bud-typings'

type Use = (bud: Bud) => WebpackRule
type ModuleBuilder = (bud: Bud) => WebpackModule

const rules: ModuleBuilder = bud =>
  bud.hooks.filter('webpack.module', {
    module: {
      rules: bud.rules.repository.map((rule: Use) => rule(bud)),
    },
  })

export {rules}
export type {ModuleBuilder}
