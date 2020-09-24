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
const loaders: LoadersFactory = () => ({
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

/**
 * Produces rule set loaders.
 */
export type LoadersFactory = () => {[key: string]: RuleSetLoader}

export default loaders
