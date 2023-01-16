/// <reference types="@roots/bud" />

import type {BudImageminExtension} from './extension.js'
import type BudImageminSharp from './sharp/index.js'
import type {BudImageminSvgo} from './svgo/svgo.js'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImageminExtension
  }

  interface Modules {
    '@roots/bud-imagemin': BudImageminExtension
    '@roots/bud-imagemin/sharp': BudImageminSharp
    '@roots/bud-imagemin/svgo': BudImageminSvgo
  }
}
