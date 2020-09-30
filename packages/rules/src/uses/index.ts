import Use from '../Use'
import Bud from '@roots/bud-types'

import * as babel from './babel'
import * as css from './css'
import * as file from './file'
import * as minicss from './minicss'
import * as postcss from './postcss'
import * as raw from './raw'
import * as resolveUrl from './resolveUrl'
import * as style from './style'
import * as svg from './svg'

export default (bud: Bud): {[key: string]: Use} => ({
  babel: new Use(bud, babel),
  postcss: new Use(bud, postcss),
  raw: new Use(bud, raw),
  svg: new Use(bud, svg),
  css: new Use(bud, css),
  file: new Use(bud, file),
  minicss: new Use(bud, minicss),
  style: new Use(bud, style),
  resolveUrl: new Use(bud, resolveUrl),
})
