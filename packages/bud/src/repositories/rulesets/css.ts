import type {Bud} from '../..'
import {uses} from './uses'

const css = (bud: Bud): any => ({
  test: bud.patterns.get('css'),
  exclude: bud.patterns.get('vendor'),
  use: [uses.miniCss(bud), uses.css(bud), uses.resolveUrl(bud), uses.postCss(bud)],
})

export {css}
