import '@roots/bud-api'

import {Build, Extensions} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Plugins {
    'webpack-provide-plugin': Extensions.Plugin
    'webpack-config-dump-plugin': Extensions.Plugin
    'copy-webpack-plugin': Extensions.Plugin
    'webpack-define-plugin': Extensions.Plugin
    'webpack-hot-module-replacement-plugin': Extensions.Plugin
    'webpack-manifest-plugin': Extensions.Plugin
    'mini-css-extract-plugin': Extensions.Plugin
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
