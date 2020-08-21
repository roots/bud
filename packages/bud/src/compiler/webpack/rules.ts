import type {Bud} from '../..'
import type {WebpackModule, WebpackRule} from '@roots/bud-typings'

type Use = (bud: Bud) => WebpackRule
type ModuleBuilder = (bud: Bud) => WebpackModule

const rules: ModuleBuilder = bud =>
  bud.hooks.filter('webpack.module', {
    module: bud.hooks.filter('webpack.module.rules', {
      rules: bud.rules.repository.map((rule: Use) =>
        bud.hooks.filter(`webpack.module.rules.${rule.name}`, rule(bud)),
      ),
    }),
  })

export {rules}
export type {ModuleBuilder}
