import {postcss} from './register'
import type {Framework, Item, Module} from '@roots/bud-typings'

/**
 * Config methods
 */
export * as api from './api'

/**
 * PostCSS loader
 */
export {registerLoader} from './register'

/**
 * PostCSS rulesetuse item
 */
export const registerItem: Module.RegisterOne<Item.Module> = [
  'postcss',
  postcss,
]

/**
 * Use PostCSS with css extension.
 */
export const boot: Module.Boot = (bud: Framework) => {
  bud.build.rules.mutate('css.use', css => [
    ...css.splice(0, css.length - 1),
    bud.build.items.get('postcss'),
    ...css.splice(css.length - 1),
  ])
}
