import '@roots/bud-api'
import '@roots/bud-build'
import '@roots/bud-cache'
import '@roots/bud-compiler'
import '@roots/bud-dashboard'
import '@roots/bud-extensions'
import '@roots/bud-framework'
import '@roots/bud-hooks'
import '@roots/bud-server'
import '@roots/bud-terser'

import type {Build} from '@roots/bud-framework/services'

import type CDN from './extensions/bud-cdn/index.js'
import type ESM from './extensions/bud-esm/index.js'
import type FixStyleOnlyEntrypoints from './extensions/bud-fix-style-only-entrypoints/index.js'
import type Clean from './extensions/clean-webpack-plugin/index.js'
import type Copy from './extensions/copy-webpack-plugin/index.js'
import type MiniCss from './extensions/mini-css-extract-plugin/index.js'
import type Define from './extensions/webpack-define-plugin/index.js'
import type HMR from './extensions/webpack-hot-module-replacement-plugin/index.js'
import type Manifest from './extensions/webpack-manifest-plugin/index.js'
import type Provide from './extensions/webpack-provide-plugin/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    cdn: CDN
    esm: ESM
  }

  interface Modules {
    cdn: CDN
    esm: ESM
    'fix-style-only-entrypoints': FixStyleOnlyEntrypoints
    'webpack:define-plugin': Define
    'webpack:provide-plugin': Provide
    'webpack:hot-module-replacement-plugin': HMR
    'copy-webpack-plugin': Copy
    'clean-webpack-plugin': Clean
    'manifest-plugin': Manifest
    'mini-css-extract-plugin': MiniCss
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
    js: Build.Rule.Interface
    css: Build.Rule.Interface
    html: Build.Rule.Interface
    svg: Build.Rule.Interface
    image: Build.Rule.Interface
    font: Build.Rule.Interface
    xml: Build.Rule.Interface
    json5: Build.Rule.Interface
    csv: Build.Rule.Interface
    yml: Build.Rule.Interface
    toml: Build.Rule.Interface
  }
}
