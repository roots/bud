import * as Framework from '@roots/bud-framework'
import * as postcss from './item'

/**
 * PostCSS RuleSetItem
 */
export const registerItem = postcss

/**
 * PostCSS Loader
 */
export const registerLoader = (bud: Framework.Bud): void => {
  bud.components['loaders'].set(
    'postcss-loader',
    require.resolve('postcss-loader'),
  )
}

/**
 * Modify CSS rule to use PostCSS
 */
export const boot = (bud: Framework.Bud): void => {
  const use = bud.components['rules'].get('css').use(bud)

  bud.components['rules'].set('css.use', bud => [
    ...use.splice(0, use.length - 1),
    bud.components['items'].get('postcss').make(),
    ...use.splice(use.length - 1),
  ])
}
