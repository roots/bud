import type {Bud} from '..'
import type {WebpackModule} from '@roots/bud-typings'

type ModuleBuilder = (bud: Bud) => WebpackModule

const rules: ModuleBuilder = bud =>
  bud.hooks.filter('webpack.module', {
    module: bud.hooks.filter('webpack.module.rules', {
      rules: Object.entries(bud.rules.repository).reduce(
        (a, [key, fn]) => [
          ...(a ? a : []),
          bud.hooks.filter(
            `webpack.module.rules.${key}`,
            typeof fn == 'function' ? fn(bud) : console.log(fn),
          ),
        ],
        [],
      ),
    }),
  })

export {rules}
export type {ModuleBuilder}
