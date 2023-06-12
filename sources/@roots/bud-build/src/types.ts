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
    yml: Loader
  }

  interface Items {
    css: Item
    cssModule: Item
    csv: Item
    file: Item
    font: Item
    html: Item
    image: Item
    md: Item
    minicss: Item
    precss: Item
    raw: Item
    style: Item
    yml: Item
  }

  interface Rules {
    css: Rule
    cssModule: Rule
    csv: Rule
    font: Rule
    html: Rule
    image: Rule
    inlineFont: Rule
    inlineImage: Rule
    inlineSvg: Rule
    js: Rule
    json: Rule
    svg: Rule
    toml: Rule
    yml: Rule
  }
}
