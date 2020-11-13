import {Rule} from '@roots/bud-typings'

import * as css from './css'
import * as font from './font'
import * as html from './html'
import * as image from './image'
import * as js from './js'
import * as svg from './svg'

export const mapped: {
  [key: string]: Rule.Module
} = Object.entries({
  css,
  font,
  html,
  image,
  js,
  svg,
}).reduce(
  (
    dictionary: {[key: string]: Rule.Module},
    [k, v]: [string, Rule.Module],
  ): {[key: string]: Rule.Module} => ({
    ...dictionary,
    [`${k}`]: v,
  }),
  {},
)

export {css, font, html, image, js, svg}
