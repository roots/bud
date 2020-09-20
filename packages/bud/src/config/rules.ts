import type {BudInterface} from '../'
import type {Configuration, Module} from 'webpack'

type ModuleBuilder = (
  bud: BudInterface,
) => Configuration['module']

const rules: ModuleBuilder = bud =>
  bud.hooks.filter('webpack.module', {
    module: bud.hooks.filter('webpack.module.rules', {
      rules: bud.rules
        .entries()
        .reduce(
          (
            a: Module['rules'],
            [key, rule]: [string, CallableFunction],
          ) => [
            ...a,
            bud.hooks.filter(
              `webpack.module.rules.${key}`,
              typeof rule == 'function'
                ? rule(bud)
                : console.log(rule),
            ),
          ],
          [],
        ),
    }),
  })

export {rules}
export type {ModuleBuilder}
