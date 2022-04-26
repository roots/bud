import type {Build} from '@roots/bud-framework'

import type BudClean from './extensions/clean-webpack-plugin'
import type BudCopy from './extensions/copy-webpack-plugin'
import type BudMiniCss from './extensions/mini-css-extract-plugin'
import type BudDefine from './extensions/webpack-define-plugin'
import type BudHMR from './extensions/webpack-hot-module-replacement-plugin'
import type BudManifest from './extensions/webpack-manifest-plugin'
import type BudProvide from './extensions/webpack-provide-plugin'

declare module '@roots/bud-framework' {
  interface Modules {
    'webpack:define-plugin': BudDefine
    'webpack:provide-plugin': BudProvide
    'webpack:hot-module-replacement-plugin': BudHMR
    'copy-webpack-plugin': BudCopy
    'clean-webpack-plugin': BudClean
    'manifest-plugin': BudManifest
    'mini-css-extract-plugin': BudMiniCss
  }

  interface Loaders {
    css: Build.Loader
    csv: Build.Loader
    file: Build.Loader
    html: Build.Loader
    md: Build.Loader
    minicss: Build.Loader
    resolveUrl: Build.Loader
    style: Build.Loader
    url: Build.Loader
    xml: Build.Loader
  }

  interface Items {
    precss: Build.Item
    minicss: Build.Item
    style: Build.Item
    css: Build.Item
    csv: Build.Item
    file: Build.Item
    image: Build.Item
    font: Build.Item
    html: Build.Item
    md: Build.Item
    resolveUrl: Build.Item
    raw: Build.Item
    xml: Build.Item
  }

  interface Rules {
    js: Build.Rule
    css: Build.Rule
    html: Build.Rule
    svg: Build.Rule
    image: Build.Rule
    font: Build.Rule
    xml: Build.Rule
    json5: Build.Rule
    csv: Build.Rule
    yml: Build.Rule
    toml: Build.Rule
  }
}
