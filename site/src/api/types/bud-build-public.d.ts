/**
 * Compiler configuration builder
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @core @packageDocumentation @betaDocumentation
 */

import {Build as Build_2} from '@roots/bud-framework'
import {Factory} from '@roots/bud-framework'
import {Framework} from '@roots/bud-framework'
import {Item as Item_2} from '@roots/bud-framework'
import {Items} from '@roots/bud-framework'
import {Loader as Loader_2} from '@roots/bud-framework'
import {Loaders} from '@roots/bud-framework'
import {Maybe} from '@roots/bud-framework'
import {Rule as Rule_2} from '@roots/bud-framework'
import {Rules} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import type * as Webpack from 'webpack'

/**
 * {@link @roots/bud-framework#Items.asset | asset factory}
 *
 * @returns {@link @roots/bud-build#Item | Item}
 *
 * @public
 */
declare const asset: () => Item

/**
 * Framework configuration builder class
 *
 * @public
 */
export declare class
  extends Service
  implements Build_2.Interface
{
  /* Excluded from this release type: _config */
  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.name}
   *
   * @public
   */
  name: string
  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.loaders}
   *
   * @public
   */
  loaders: Loaders
  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.rules}
   *
   * @public
   */
  rules: Rules
  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.items}
   *
   * @public
   */
  items: Items
  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.bootstrap}
   *
   * @public
   */
  bootstrap(): void
  /**
   * Finalized build configuration
   *
   * @public @readonly
   */
  get config(): Webpack.Configuration
  /**
   * Finalized build configuration
   *
   * @deprecated Use {@link Build.Interface.config} instead
   *
   * @public
   */
  rebuild(): Webpack.Configuration
}

/**
 * {@link @roots/bud-framework#Items.css | css factory}
 *
 * @returns {@link @roots/bud-build#Item | Item}
 *
 * @public
 */
declare const css: () => Item

/**
 * Returns {@link Rule} for `.css` handling
 */
declare const css_2: () => Rule

/**
 * Returns {@link Loader} for `css-loader`
 */
declare const css_3: () => Loader

/**
 * Returns {@link Item} for csv
 */
declare const csv: () => Item

/**
 * Returns {@link Rule} for `.csv` handling
 */
declare const csv_2: () => Rule

/**
 * Returns {@link Loader} for `csv-loader`
 */
declare const csv_3: () => Loader

/**
 * Returns {@link Item} for file
 */
declare const file: () => Item

/**
 * Returns {@link Loader} for `file-loader`
 */
declare const file_2: () => Loader

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 */
declare const font: () => Rule

/**
 * Returns {@link Item} for html
 */
declare const html: () => Item

/**
 * Returns {@link Rule} for `.html` handling
 */
declare const html_2: () => Rule

/**
 * Returns {@link Loader} for `html-loader`
 */
declare const html_3: () => Loader

/**
 * Returns {@link Rule} for `asset/resource`
 */
declare const image: () => Rule

/**
 * Item class
 *
 * @public
 */
export declare class
  extends Item_2.Abstract
  implements Item_2.Interface
{
  /**
   * Loader
   *
   * @public
   */
  loader: Factory<[Framework], Loader_2.Interface>
  /**
   * Loader options
   *
   * @public
   */
  options: Factory<[Framework], Item_2.Options>
  /**
   * Class constructor
   *
   * @param options - {@link Item.Options}
   */
  constructor({loader, options}: Item_2.ConstructorOptions)
  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.getLoader}
   *
   * @public
   * @decorator `@bind`
   */
  getLoader(app: Framework): Loader_2.Interface
  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.setLoader}
   *
   * @public
   * @decorator `@bind`
   */
  setLoader(loader: Maybe<[Framework], Loader_2.Interface>): void
  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.seOptions}
   *
   * @public
   * @decorator `@bind`
   */
  setOptions(options: Maybe<[Framework], Item_2.Options>): void
  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.mergeOptions}
   *
   * @public
   * @decorator `@bind`
   */
  mergeOptions(options: Item_2.Options, app: Framework): void
  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.make}
   *
   * @public
   * @decorator `@bind`
   */
  make(app: Framework): Item_2.Output
}

declare namespace items {
  export {
    asset,
    css,
    csv,
    html,
    style,
    md,
    minicss,
    raw,
    file,
    resolveUrl,
    xml,
  }
}
export {items}

/**
 * Returns {@link Rule} for `.js` handling
 */
declare const js: () => Rule

/**
 * Returns {@link Rule} for `.jsonc` handling
 */
declare const json5: () => Rule

/**
 * Framework Loader
 *
 * @public
 */
export declare class
  extends Loader_2.Abstract
  implements Loader_2.Interface
{
  /**
   * {@link @roots/bud-framework#Factory | Factory} returning the loader path
   */
  src: Factory<[Framework], string>
  /**
   * Class constructor
   *
   * @param src - Either a factory returning a string or a literal string
   *
   * @public
   */
  constructor(src: Maybe<[Framework], string>)
  /**
   * {@link @roots/bud-framework#Factory | Factory} producing the final loader path
   *
   * @param app - {@link @roots/bud-framework#Framework}
   * @returns final loader path
   *
   * @public
   * @decorator `@bind`
   */
  make(app: Framework): string
  /**
   * Ensure that a userInput is assigned to the class as a {@link @roots/bud-framework#Factory | Factory}
   *
   * @param input - input value
   * @returns normalized value from user input
   *
   * @public
   */
  normalizeInput<T = any>(
    input: Maybe<[Framework], T>,
  ): Factory<[Framework], T>
}

declare namespace loaders {
  export {
    css_3 as css,
    csv_3 as csv,
    file_2 as file,
    html_3 as html,
    md_2 as md,
    minicss_2 as minicss,
    resolveUrl_2 as resolveUrl,
    style_2 as style,
    url,
    xml_3 as xml,
  }
}
export {loaders}

/**
 * Returns {@link Item} for markdown
 */
declare const md: () => Item

/**
 * Returns {@link Loader} for `remark-loader`
 */
declare const md_2: () => Loader

/**
 * Returns {@link Item} for minicss-extract-plugin
 */
declare const minicss: () => Item

/**
 * Returns {@link Loader} for `mini-css-extract-plugin.loader`
 */
declare const minicss_2: () => Loader

/**
 * Returns {@link Item} for raw
 */
declare const raw: () => Item

/**
 * Returns {@link Item} resolve-url
 */
declare const resolveUrl: () => Item

/**
 * Returns {@link Loader} for `resolve-url-loader`
 */
declare const resolveUrl_2: () => Loader

/**
 * Framework Rule
 *
 * @public
 */
export declare class Rule
  extends Rule_2.Abstract
  implements Rule_2.Interface
{
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
   *
   * @public
   */
  test: Factory<[Framework], RegExp>
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
   *
   * @public
   */
  use: Factory<[Framework], Item_2.Interface[]>
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
   *
   * @public
   */
  exclude: Factory<[Framework], RegExp>
  /**
   * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
   *
   * @public
   */
  type: Factory<[Framework], string>
  /**
   * Generator factory
   *
   * @public
   */
  parser: Factory<[Framework], Rule_2.Parser>
  /**
   * Generator factory
   *
   * @public
   */
  generator: Factory<[Framework], any>
  /**
   * Class constructor
   *
   * @public
   */
  constructor({
    test,
    use,
    exclude,
    type,
    parser,
    generator,
  }: Rule_2.Options)
  /**
   *
   * @param app - {@link @roots/bud-framework#Framework | Framework}
   * @returns
   *
   * @public
   * @decorator `@bind`
   */
  getTest(app: Framework): RegExp
  setTest(test: RegExp | ((app: Framework) => RegExp)): void
  getParser(app: Framework): Rule_2.Parser
  setParser(parser: Maybe<[Framework], Rule_2.Parser>): void
  getUse(app: Framework): Item_2.Interface[]
  setUse(use: Maybe<[Framework], Item_2.Interface[]>): void
  getExclude(app: Framework): RegExp
  setExclude(exclude: Maybe<[Framework], RegExp>): void
  getType(app: Framework): string
  setType(type: any): void
  getGenerator(app: Framework): any
  setGenerator(generator: any): void
  /**
   * Produce final Base output
   *
   * @param app - {@link @roots/bud-framework#Framework}
   * @returns finalized rule
   *
   * @public
   * @decorator `@bind`
   */
  make(app: Framework): Rule_2.Output
}

declare namespace rules {
  export {
    image,
    font,
    svg,
    html_2 as html,
    csv_2 as csv,
    xml_2 as xml,
    toml,
    yml,
    json5,
    css_2 as css,
    js,
  }
}
export {rules}

/**
 * Returns {@link Item} for style
 */
declare const style: () => Item

/**
 * Returns {@link Loader} for `style-loader`
 */
declare const style_2: () => Loader

/**
 * Returns {@link Rule} for `.svg` handling
 */
declare const svg: () => Rule

/**
 * Returns {@link Rule} for `.toml` handling
 */
declare const toml: () => Rule

/**
 * Returns {@link Loader} for `url-loader`
 */
declare const url: () => Loader

/**
 * Returns {@link Item} for xml
 */
declare const xml: () => Item

/**
 * Returns {@link Rule} for `.xml` handling
 */
declare const xml_2: () => Rule

/**
 * Returns {@link Loader} for `xml-loader`
 */
declare const xml_3: () => Loader

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 */
declare const yml: () => Rule

export {}
