import {isEqual} from '@roots/bud-support'
import type {Item} from '@roots/bud-typings'

/**
 * This fixes issues with SWR thinking its in the browser.
 * @todo does this fix the vue extension issue?
 */
isEqual(typeof global.navigator, Object) &&
  Object.assign(global, {navigator: undefined})

export const ident: Item['ident'] = 'sass'

export const loader: Item['loader'] = 'sass-loader'

export const options: Item['options'] = {
  implementation: require('sass'),
}
