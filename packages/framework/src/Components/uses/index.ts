import Bud from '../../Bud'
import Use from '../Use'

import * as babel from './babel'
import * as css from './css'
import * as file from './file'
import * as minicss from './minicss'
import * as postcss from './postcss'
import * as raw from './raw'
import * as resolveUrl from './resolveUrl'
import * as style from './style'
import * as svg from './svg'

export default (bud: Bud): {[key: string]: Bud.Build.Use} => {
  return bud.hooks.filter('components.uses', {
    ['babel-loader']: new Use(bud, babel),
    ['postcss-loader']: new Use(bud, postcss),
    ['raw-loader']: new Use(bud, raw),
    ['svg-loader']: new Use(bud, svg),
    ['css-loader']: new Use(bud, css),
    ['file-loader']: new Use(bud, file),
    ['minicss-loader']: new Use(bud, minicss),
    ['style-loader']: new Use(bud, style),
    ['resolve-url-loader']: new Use(bud, resolveUrl),
  }) as {[key: string]: Bud.Build.Use}
}
