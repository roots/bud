import '@roots/bud-api'

import * as Framework from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Plugins {
    'webpack-provide-plugin': Framework.Extension.CompilerPlugin
    'clean-webpack-plugin': Framework.Extension.CompilerPlugin
    'webpack-config-dump-plugin': Framework.Extension.CompilerPlugin
    'copy-webpack-plugin': Framework.Extension.CompilerPlugin
    'webpack-define-plugin': Framework.Extension.CompilerPlugin
    'webpack-hot-module-replacement-plugin': Framework.Extension.CompilerPlugin
    'webpack-manifest-plugin': Framework.Extension.CompilerPlugin
    'mini-css-extract-plugin': Framework.Extension.CompilerPlugin
  }

  interface Loaders {
    css: Framework.Loader.Interface
    csv: Framework.Loader.Interface
    file: Framework.Loader.Interface
    html: Framework.Loader.Interface
    md: Framework.Loader.Interface
    minicss: Framework.Loader.Interface
    'resolve-url': Framework.Loader.Interface
    style: Framework.Loader.Interface
    url: Framework.Loader.Interface
    xml: Framework.Loader.Interface
  }

  interface Items {
    css: Framework.Item.Interface
    csv: Framework.Item.Interface
    file: Framework.Item.Interface
    image: Framework.Item.Interface
    font: Framework.Item.Interface
    html: Framework.Item.Interface
    md: Framework.Item.Interface
    minicss: Framework.Item.Interface
    'resolve-url': Framework.Item.Interface
    raw: Framework.Item.Interface
    style: Framework.Item.Interface
    xml: Framework.Item.Interface
  }

  interface Rules {
    js: Framework.Rule.Interface
    css: Framework.Rule.Interface
    html: Framework.Rule.Interface
    svg: Framework.Rule.Interface
    image: Framework.Rule.Interface
    font: Framework.Rule.Interface
    xml: Framework.Rule.Interface
    json5: Framework.Rule.Interface
    csv: Framework.Rule.Interface
    yml: Framework.Rule.Interface
    toml: Framework.Rule.Interface
  }
}
