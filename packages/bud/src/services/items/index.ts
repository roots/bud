import type {Item} from '@roots/bud-typings'

import * as cache from './cache'
import * as css from './css'
import * as file from './file'
import * as extractCss from './extractCssChunks'
import * as raw from './raw'
import * as resolve from './resolveUrl'
import * as style from './style'
import * as svg from './svg'
import * as thread from './thread'
// import * as minicss from './minicss'

export const items: {[key: string]: Item.Module} = {
  ['cache']: cache,
  ['css']: css,
  ['file']: file,
  ['mini-css']: extractCss, // substituting for minicss
  ['raw']: raw,
  ['resolve-url']: resolve,
  ['style']: style,
  ['svg']: svg,
  ['thread']: thread,
}
