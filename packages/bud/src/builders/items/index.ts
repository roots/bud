import type {Item} from '@roots/bud-typings'

import * as cache from './cache'
import * as css from './css'
import * as file from './file'
import * as minicss from './minicss'
import * as raw from './raw'
import * as resolveUrl from './resolveUrl'
import * as style from './style'
import * as svg from './svg'
import * as thread from './thread'

const modules: Item.Module[] = [
  cache,
  css,
  file,
  minicss,
  raw,
  resolveUrl,
  style,
  svg,
  thread,
]

const collate = (
  dictionary: {[key: string]: Item.Module},
  v: Item.Module,
): {[key: string]: Item.Module} => ({
  ...dictionary,
  [`${v.ident}`]: v,
})

export const items: {
  [key: string]: Item.Module
} = modules.reduce(collate, {})
