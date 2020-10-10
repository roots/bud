import * as Framework from '@roots/bud-framework'
import * as babel from './item'

/**
 * Register babel ruleset item
 */
export const registerItem = babel

/**
 * Register babel loader
 */
export const registerLoader = [
  'babel-loader',
  require.resolve('babel-loader'),
]

/**
 * Modify JS rules to use babel
 */
export const boot = (bud: Framework.Bud): void => {
  const baseUseItems = bud.components['rules'].get('js.use')(bud)

  bud.components['rules'].set('js.use', bud => [
    bud.components['items'].get('babel').make(),
    ...baseUseItems,
  ])
}
