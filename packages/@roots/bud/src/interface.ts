import {
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  /**
   * {@inheritDoc @roots/bud-framework#Plugins}
   * @public @override
   */
  interface Plugins {
    'webpack-provide-plugin': Extension.CompilerPlugin
    'clean-webpack-plugin': Extension.CompilerPlugin
    'webpack-config-dump-plugin': Extension.CompilerPlugin
    'copy-webpack-plugin': Extension.CompilerPlugin
    'css-minimizer-webpack-plugin': Extension.CompilerPlugin
    'webpack-define-plugin': Extension.CompilerPlugin
    'webpack-hot-module-replacement-plugin': Extension.CompilerPlugin
    'ignore-emit-webpack-plugin': Extension.CompilerPlugin
    'webpack-manifest-plugin': Extension.CompilerPlugin
    'mini-css-extract-plugin': Extension.CompilerPlugin
  }

  /**
   * {@inheritDoc @roots/bud-framework#Loaders}
   * @public @override
   */
  interface Loaders {
    css: Loader.Interface
    csv: Loader.Interface
    file: Loader.Interface
    html: Loader.Interface
    md: Loader.Interface
    minicss: Loader.Interface
    'resolve-url': Loader.Interface
    style: Loader.Interface
    url: Loader.Interface
    xml: Loader.Interface
  }

  /**
   * {@inheritDoc @roots/bud-framework#Items}
   * @public @override
   */
  interface Items {
    css: Item.Interface
    csv: Item.Interface
    file: Item.Interface
    image: Item.Interface
    font: Item.Interface
    html: Item.Interface
    md: Item.Interface
    minicss: Item.Interface
    'resolve-url': Item.Interface
    raw: Item.Interface
    style: Item.Interface
    xml: Item.Interface
  }

  /**
   * {@inheritDoc @roots/bud-framework#Rules}
   * @public @override
   */
  interface Rules {
    js: Rule.Interface
    css: Rule.Interface
    html: Rule.Interface
    svg: Rule.Interface
    image: Rule.Interface
    font: Rule.Interface
    xml: Rule.Interface
    json5: Rule.Interface
    csv: Rule.Interface
    yml: Rule.Interface
    toml: Rule.Interface
  }
}
