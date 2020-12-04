import {postcss} from './register'
import type {Boot, Item} from './types'

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
export const registerItem: Item = ['postcss', postcss]

/**
 * Use PostCSS with css extension.
 */
export const boot: Boot = ({build}) => {
  build.rules.mutate('css.use', css => [
    ...css.splice(0, css.length - 1),
    build.items.get('postcss'),
    ...css.splice(css.length - 1),
  ])
}
