import {postcss} from './register'
import type {Framework, Item, Module} from '@roots/bud-typings'

/**
 * Config methods
 */
export * as api from './api'

/**
 * PostCSS loader
 */
export {setLoader} from './register'

/**
 * PostCSS rulesetuse item
 */
export const setItem: Module.Register<Item> = [
  'postcss',
  postcss,
]

/**
 * Use PostCSS with css extension.
 */
export const boot: Module.Boot = (bud: Framework) => {
  bud.build.rules.mutate('css.use', use => [
    ...use.splice(0, use.length - 1),
    bud.build.items.get('postcss'),
    ...use.splice(use.length - 1),
  ])
}
