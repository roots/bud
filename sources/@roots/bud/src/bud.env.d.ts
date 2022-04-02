import '@roots/bud-api'
import '@roots/bud-build'
import '@roots/bud-cache'
import '@roots/bud-compiler'
import '@roots/bud-dashboard'
import '@roots/bud-extensions'
import '@roots/bud-hooks'
import '@roots/bud-server'

import * as Framework from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Plugins {
    'webpack-provide-plugin': Framework.Extension.CompilerPlugin
    'webpack-config-dump-plugin': Framework.Extension.CompilerPlugin
    'copy-webpack-plugin': Framework.Extension.CompilerPlugin
    'webpack-define-plugin': Framework.Extension.CompilerPlugin
    'webpack-hot-module-replacement-plugin': Framework.Extension.CompilerPlugin
    'webpack-manifest-plugin': Framework.Extension.CompilerPlugin
    'mini-css-extract-plugin': Framework.Extension.CompilerPlugin
  }

  interface Loaders {
    css: Framework.Loader
    csv: Framework.Loader
    file: Framework.Loader
    html: Framework.Loader
    md: Framework.Loader
    minicss: Framework.Loader
    resolveUrl: Framework.Loader
    style: Framework.Loader
    url: Framework.Loader
    xml: Framework.Loader
  }

  interface Items {
    precss: Framework.Item
    minicss: Framework.Item
    style: Framework.Item
    css: Framework.Item
    csv: Framework.Item
    file: Framework.Item
    image: Framework.Item
    font: Framework.Item
    html: Framework.Item
    md: Framework.Item
    resolveUrl: Framework.Item
    raw: Framework.Item
    xml: Framework.Item
  }

  interface Rules {
    js: Framework.Rule
    css: Framework.Rule
    html: Framework.Rule
    svg: Framework.Rule
    image: Framework.Rule
    font: Framework.Rule
    xml: Framework.Rule
    json5: Framework.Rule
    csv: Framework.Rule
    yml: Framework.Rule
    toml: Framework.Rule
  }
}
