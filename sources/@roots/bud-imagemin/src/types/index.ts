import type {ExtensionApi} from '@roots/bud-framework/extension'

import type BudImageminExtension from '../extension/index.js'
import type BudImageminSharpExtension from '../sharp/index.js'
import type BudImageminSvgo from '../svgo/index.js'

interface BudSharp
  extends ExtensionApi<
    {
      encode: BudImageminSharpExtension['encode']
      generators: BudImageminSharpExtension['generators']
      get: BudImageminSharpExtension['get']
      setEncodeOptions: BudImageminSharpExtension['setEncodeOptions']
      setGenerator: BudImageminSharpExtension['setGenerator']
    },
    BudImageminSharpExtension
  > {}

interface BudSvgo
  extends ExtensionApi<
    {
      encode: BudImageminSvgo['encode']
      setEncodeOptions: BudImageminSvgo['setEncodeOptions']
    },
    BudImageminSvgo
  > {}

interface BudImagemin
  extends ExtensionApi<
    BudImageminExtension,
    {
      addPreset: BudImageminExtension['addPreset']
      encode: BudImageminExtension['encode']
      lossless: BudImageminExtension[`lossless`]
      sharp: BudSharp
      svgo: BudSvgo
    }
  > {}

declare module '@roots/bud-framework' {
  interface Bud {
    imagemin: BudImagemin
  }

  interface Modules {
    '@roots/bud-imagemin': Bud[`imagemin`]
    '@roots/bud-imagemin/sharp': Bud[`imagemin`][`sharp`]
    '@roots/bud-imagemin/svgo': Bud[`imagemin`][`svgo`]
  }
}
