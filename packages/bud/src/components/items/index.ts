import type {Item} from '@roots/bud-typings'

import * as cache from './cache'
import * as css from './css'
import * as file from './file'
import * as minicss from './minicss'
import * as raw from './raw'
import * as resolve from './resolveUrl'
import * as style from './style'
import * as svg from './svg'
import * as thread from './thread'

export const items: {[key: string]: Item.Module} = {
  ['cache']: cache,
  ['css']: css,
  ['file']: file,
  ['mini-css']: minicss,
  ['raw']: raw,
  ['resolve-url']: resolve,
  ['style']: style,
  ['svg']: svg,
  ['thread']: thread,
}
