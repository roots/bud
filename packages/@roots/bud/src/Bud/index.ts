import {items, loaders, rules} from '@roots/bud-build'
import {Framework} from '@roots/bud-framework'

import * as CleanWebpackPlugin from '../extensions/clean-webpack-plugin'
import * as CopyWebpackPlugin from '../extensions/copy-webpack-plugin'
import * as CssMinimizerWebpackPlugin from '../extensions/css-minimizer-webpack-plugin'
import * as IgnoreEmitWebpackPlugin from '../extensions/ignore-emit-webpack-plugin'
import * as MiniCssExtractPlugin from '../extensions/mini-css-extract-plugin'
import * as WebpackConfigDumpPlugin from '../extensions/webpack-config-dump-plugin'
import * as DefineWebpackPlugin from '../extensions/webpack-define-plugin'
import * as HotModuleReplacementPlugin from '../extensions/webpack-hot-module-replacement-plugin'
import * as WebpackManifestPlugin from '../extensions/webpack-manifest-plugin'
import * as WebpackProvidePlugin from '../extensions/webpack-provide-plugin'

/**
 * Bud is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
 */
class Bud extends Framework {
  /**
   * Concrete implementation of the {@link Framework Framework interface}
   *
   * @remark
   * Fulfills {@link Framework.implementation}
   */
  public implementation: Framework.Constructor

  /**
   * Class constructor
   */
  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }
}

declare module '@roots/bud-framework' {
  /**
   * Registered extensions
   */
  interface Extensions {
    ['webpack-provide-plugin']: typeof WebpackProvidePlugin
    ['clean-webpack-plugin']: typeof CleanWebpackPlugin
    ['webpack-config-dump-plugin']: typeof WebpackConfigDumpPlugin
    ['copy-webpack-plugin']: typeof CopyWebpackPlugin
    ['css-minimizer-webpack-plugin']: typeof CssMinimizerWebpackPlugin
    ['webpack-define-plugin']: typeof DefineWebpackPlugin
    ['webpack-hot-module-replacement-plugin']: typeof HotModuleReplacementPlugin
    ['ignore-emit-webpack-plugin']: typeof IgnoreEmitWebpackPlugin
    ['webpack-manifest-plugin']: typeof WebpackManifestPlugin
    ['mini-css-extract-plugin']: typeof MiniCssExtractPlugin
  }

  /**
   * Registered loaders
   */
  interface Loaders {
    css: typeof loaders.css
    csv: typeof loaders.csv
    file: typeof loaders.file
    html: typeof loaders.html
    md: typeof loaders.md
    minicss: typeof loaders.md
    'resolve-url': typeof loaders['resolveUrl']
    style: typeof loaders.style
    url: typeof loaders.url
    xml: typeof loaders.xml
  }

  /**
   * Registered items
   */
  interface Items {
    css: typeof items.css
    csv: typeof items.csv
    file: typeof items.file
    image: typeof items.asset
    font: typeof items.file
    html: typeof items.html
    md: typeof items.md
    minicss: typeof items.minicss
    'resolve-url': typeof items.resolveUrl
    raw: typeof items.raw
    style: typeof items.style
    xml: typeof items.xml
  }

  /**
   * Registered rules
   */
  interface Rules {
    js: typeof rules.js
    css: typeof rules.css
    html: typeof rules.html
    svg: typeof rules.svg
    image: typeof rules.image
    font: typeof rules.font
    xml: typeof rules.xml
    json5: typeof rules.json5
    csv: typeof rules.csv
    yml: typeof rules.yml
    toml: typeof rules.toml
  }
}

export {Bud, Framework}
