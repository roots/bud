import type Bud from '../../Bud'
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

export default (bud: Bud): {[key: string]: Build.Item} => {
  return bud.hooks.filter('components.uses', {
    ['babel-loader']: new Item(bud, babel),
    ['postcss-loader']: new Item(bud, postcss),
    ['raw-loader']: new Item(bud, raw),
    ['svg-loader']: new Item(bud, svg),
    ['css-loader']: new Item(bud, css),
    ['file-loader']: new Item(bud, file),
    ['minicss-loader']: new Item(bud, minicss),
    ['style-loader']: new Item(bud, style),
    ['resolve-url-loader']: new Item(bud, resolveUrl),
  }) as {[key: string]: Build.Item}
}
