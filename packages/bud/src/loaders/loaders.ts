import * as babel from './babel'
import * as svg from './svg'

import css from './css'
import file from './file'
import minicss from './minicss'
import postcss from './postcss'
import raw from './raw'
import resolveUrl from './resolveUrl'
import style from './style'

import {RuleSetLoader} from 'webpack'

/**
 * RuleSetLoaders
 */
const loaders = (): {[key: string]: RuleSetLoader} => ({
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
