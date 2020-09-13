import type {Bud} from '..'
import type {WebpackModule} from '@roots/bud-types'

type ModuleBuilder = (bud: Bud) => WebpackModule

const rules: ModuleBuilder = bud =>
  bud.hooks.filter('webpack.module', {
    module: bud.hooks.filter('webpack.module.rules', {
      rules: bud.rules
        .entries()
        .reduce(
          (a, [key, fn]) => [
            ...a,
            bud.hooks.filter(
              `webpack.module.rules.${key}`,
              fn(bud),
            ),
          ],
          [],
        ),
    }),
  })

export {rules}
export type {ModuleBuilder}
