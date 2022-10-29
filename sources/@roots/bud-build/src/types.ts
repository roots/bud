import type {Build} from '@roots/bud-framework/services'

declare module '@roots/bud-framework' {
  interface Loaders {
    css: Build.Loader
    csv: Build.Loader
    file: Build.Loader
    html: Build.Loader
    md: Build.Loader
    minicss: Build.Loader
    raw: Build.Loader
    style: Build.Loader
    url: Build.Loader
    xml: Build.Loader
    yml: Build.Loader
  }

  interface Items {
    precss: Build.Item
    minicss: Build.Item
    style: Build.Item
    css: Build.Item
    cssModule: Build.Item
    csv: Build.Item
    file: Build.Item
    image: Build.Item
    font: Build.Item
    html: Build.Item
    md: Build.Item
    raw: Build.Item
    xml: Build.Item
    yml: Build.Item
  }

  interface Rules {
    js: Build.Rule.Interface
    css: Build.Rule.Interface
    cssModule: Build.Rule.Interface
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
