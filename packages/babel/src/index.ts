import * as Framework from '@roots/bud-framework'
import * as babel from './babel'

/**
 * Register babel loader
 */
export const registerLoader = [
  'babel',
  require.resolve('babel-loader'),
]

/**
 * Register babel rules and config
 */
export const registerItems = {babel}

/**
 * Modify JS rules to use babel
 */
export const boot = (bud: Framework.Bud): void => {
  const baseUseItems = bud.components['rules'].get('js.use')(bud)

  bud.components['rules'].set('js.use', bud => [
    ...baseUseItems,
    bud.components['items'].get('babel').make(),
  ])
}
