// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Configuration builder
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import {default as Item} from '@roots/bud-build/item'
import {default as Loader} from '@roots/bud-build/loader'
import {default as Rule} from '@roots/bud-build/rule'
import {default as Build} from '@roots/bud-build/service'

declare module '@roots/bud-framework' {
  interface Services {
    build: Build
  }

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
    [`css-module`]: Item
    css: Item
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
    [`css-module`]: Rule
    css: Rule
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

export {Build as default, Item, Loader, Rule}
