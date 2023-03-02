/// <reference types="@roots/bud" />

import type BudImageminExtension from '../extension/index.js'
import type BudImageminSharp from '../sharp/index.js'
import type BudImageminSvgo from '../svgo/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: {
      encode: BudImageminExtension['encode']
      addPreset: BudImageminExtension['addPreset']
      lossless: BudImageminExtension[`lossless`]
      sharp: {
        get: BudImageminSharp['get']
        getOptions: BudImageminSharp['getOptions']
        set: BudImageminSharp['set']
        setOptions: BudImageminSharp['setOptions']
        generators: BudImageminSharp['generators']
        implementation: BudImageminSharp['implementation']
        setEncodeOptions: BudImageminSharp['setEncodeOptions']
        setGenerator: BudImageminSharp['setGenerator']
      }
      svgo: {
        get: BudImageminSvgo['get']
        getOptions: BudImageminSvgo['getOptions']
        set: BudImageminSvgo['set']
        setOptions: BudImageminSvgo['setOptions']
        implementation: BudImageminSvgo['implementation']
        setEncodeOptions: BudImageminSvgo['setEncodeOptions']
      }
    }
  }

  interface Modules {
    '@roots/bud-imagemin': Bud[`imagemin`]
    '@roots/bud-imagemin/sharp': Bud[`imagemin`][`sharp`]
    '@roots/bud-imagemin/svgo': Bud[`imagemin`][`svgo`]
  }
}
