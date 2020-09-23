import babel from './babel'
import css from './css'
import file from './file'
import minicss from './minicss'
import postcss from './postcss'
import raw from './raw'
import resolveUrl from './resolveUrl'
import style from './style'
import svg from './svg'

import {Loose} from '@roots/bud-framework'

/**
 * RuleSetLoaders
 */
const loaders = (): Loose => ({
  babel,
  css,
  file,
  minicss,
  raw,
  style,
  svg,
  postcss,
  resolveUrl,
})

export {loaders as default}
