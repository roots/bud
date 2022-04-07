import '@roots/bud-api'
import '@roots/bud-build'
import '@roots/bud-cache'
import '@roots/bud-compiler'
import '@roots/bud-dashboard'
import '@roots/bud-extensions'
import '@roots/bud-hooks'
import '@roots/bud-server'

import {Build, Extension} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Plugins {
    'webpack-provide-plugin': Extension.Plugin
    'webpack-config-dump-plugin': Extension.Plugin
    'copy-webpack-plugin': Extension.Plugin
    'webpack-define-plugin': Extension.Plugin
    'webpack-hot-module-replacement-plugin': Extension.Plugin
    'webpack-manifest-plugin': Extension.Plugin
    'mini-css-extract-plugin': Extension.Plugin
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
