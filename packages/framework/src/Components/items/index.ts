import Item from '../Item'

import * as babel from './babel'
import * as css from './css'
import * as file from './file'
import * as minicss from './minicss'
import * as postcss from './postcss'
import * as raw from './raw'
import * as resolveUrl from './resolveUrl'
import * as style from './style'
import * as svg from './svg'

/**
 * Dictionary of Items to be used in RuleSets.
 *
 * @example
 *  bud.store['items'].get('babel')
 */
export default (
  bud: Framework.Bud,
): {[key: string]: Build.Item} => {
  return bud.hooks.filter('components.uses', {
    ['babel']: new Item(bud, babel),
    ['postcss']: new Item(bud, postcss),
    ['raw']: new Item(bud, raw),
    ['svg']: new Item(bud, svg),
    ['css']: new Item(bud, css),
    ['file']: new Item(bud, file),
    ['minicss']: new Item(bud, minicss),
    ['style']: new Item(bud, style),
    ['resolve-url']: new Item(bud, resolveUrl),
  }) as {[key: string]: Build.Item}
}
