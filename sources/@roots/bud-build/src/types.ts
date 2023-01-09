/// <reference types="@roots/bud-framework" />
/// <reference types="@roots/bud-hooks" />

import type {Item} from './item/index.js'
import type {Loader} from './loader/index.js'
import type {Rule} from './rule/index.js'

declare module '@roots/bud-framework' {
  interface Loaders {
    css: Loader
    csv: Loader
    file: Loader
    html: Loader
    md: Loader
    minicss: Loader
    raw: Loader
    style: Loader
    url: Loader
    xml: Loader
    yml: Loader
  }

  interface Items {
    precss: Item
    minicss: Item
    style: Item
    css: Item
    cssModule: Item
    csv: Item
    file: Item
    image: Item
    font: Item
    html: Item
    md: Item
    raw: Item
    xml: Item
    yml: Item
  }

  interface Rules {
    js: Rule
    css: Rule
    cssModule: Rule
    html: Rule
    svg: Rule
    image: Rule
    font: Rule
    xml: Rule
    json: Rule
    csv: Rule
    yml: Rule
    toml: Rule
    inlineSvg: Rule
    inlineFont: Rule
    inlineImage: Rule
  }
}
