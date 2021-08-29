import type {Module} from '@roots/bud-framework'
import * as BudRecommendPreset from '@roots/bud-preset-recommend'
import * as BudReactExtension from '@roots/bud-react'
import * as BudWordPressDependenciesExtension from '@roots/bud-wordpress-dependencies'
import * as BudWordPressExternalsExtension from '@roots/bud-wordpress-externals'
import * as BudWordPressManifestsExtension from '@roots/bud-wordpress-manifests'

declare module '@roots/bud-framework' {
  interface Extensions {
    '@roots/bud-preset-wordpress': BudPresetRecommend
  }
}

interface BudPresetRecommend extends Module {}

const BudPresetRecommend: BudPresetRecommend = {
  name: '@roots/bud-preset-wordpress',

  register: app => {
    app.use([
      BudRecommendPreset,
      BudReactExtension,
      BudWordPressDependenciesExtension,
      BudWordPressExternalsExtension,
      BudWordPressManifestsExtension,
    ])
  },
}

export const {name, register} = BudPresetRecommend
