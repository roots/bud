import '@roots/bud-api'
import '@roots/bud-build'
import '@roots/bud-cache'
import '@roots/bud-compiler'
import '@roots/bud-dashboard'
import '@roots/bud-extensions'
import '@roots/bud-framework'
import '@roots/bud-hooks'
import '@roots/bud-server'

import type {Build} from '@roots/bud-framework/services'

import type BudCDN from './extensions/bud-cdn/index.js'
import type BudESM from './extensions/bud-esm/index.js'
import type BudClean from './extensions/clean-webpack-plugin/index.js'
import type BudCopy from './extensions/copy-webpack-plugin/index.js'
import type BudMiniCss from './extensions/mini-css-extract-plugin/index.js'
import type BudDefine from './extensions/webpack-define-plugin/index.js'
import type BudHMR from './extensions/webpack-hot-module-replacement-plugin/index.js'
import type BudManifest from './extensions/webpack-manifest-plugin/index.js'
import type BudProvide from './extensions/webpack-provide-plugin/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    cdn: BudCDN
    esm: BudESM
  }

  interface Modules {
    cdn: BudCDN
    esm: BudESM
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
