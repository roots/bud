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

import { Build as Build_2 } from '@roots/bud-framework';
import { Factory } from '@roots/bud-framework';
import * as Framework from '@roots/bud-framework';
import { Framework as Framework_2 } from '@roots/bud-framework';
import { Item as Item_2 } from '@roots/bud-framework';
import { Items } from '@roots/bud-framework';
import { Loader as Loader_2 } from '@roots/bud-framework';
import { Loaders } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';
import { Rule as Rule_2 } from '@roots/bud-framework';
import { Rules } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
import type * as Webpack from 'webpack';

/**
 * Framework configuration builder class
 *
 * @public
 */
export declare class Build extends Service implements Build_2.Interface {
    /* Excluded from this release type: config */
    /**
     * {@inheritDoc @roots/bud-framework#Build.Interface.loaders}
     *
     * @public
     */
    loaders: Loaders;
    /**
     * {@inheritDoc @roots/bud-framework#Build.Interface.rules}
     *
     * @public
     */
    rules: Rules;
    /**
     * {@inheritDoc @roots/bud-framework#Build.Interface.items}
     *
     * @public
     */
    items: Items;
    /**
     * Make build
     * @public
     * @decorator `@bind`
     */
    make(): Promise<Webpack.Configuration>;
    /**
     * {@inheritDoc @roots/bud-framework#Build.Interface.bootstrap}
     *
     * @public
     * @decorator `@bind`
     */
    register(): Promise<void>;
    booted(): Promise<void>;
    /**
     * @public
     */
    writeFinalConfig(): Promise<void>;
    /**
     * @public
     */
    init(): Promise<void>;
}

/**
 * Returns {@link Rule} for `.css` handling
 */
declare const css: () => Rule;

/**
 * Returns {@link Rule} for `.csv` handling
 */
declare const csv: () => Rule;

declare const _default: {
    asset: () => Item;
    /**
     * .css handler factory
     */
    css: () => Item;
    /**
     * .csv handler factory
     */
    csv: () => Item;
    /**
     * .html handler factory
     */
    html: () => Item;
    /**
     * Factory {@link Item} for style
     */
    style: () => Item;
    /**
     * Factory {@link Item} for markdown
     */
    md: () => Item;
    /**
     * Factory {@link Item} for minicss-extract-plugin
     */
    minicss: () => Item;
    /**
     * Factory {@link Item} for raw
     */
    raw: () => Item;
    /**
     * Factory {@link Item} for file
     */
    file: () => Item;
    /**
     * Factory {@link Item} resolve-url
     */
    "resolve-url": () => Item;
    /**
     * Factory {@link Item} for xml
     */
    xml: () => Item;
};

declare const _default_2: {
    css: () => Loader;
    /**
     * Returns {@link Loader} for `csv-loader`
     */
    csv: () => Loader;
    /**
     * Returns {@link Loader} for `file-loader`
     */
    file: () => Loader;
    /**
     * Returns {@link Loader} for `html-loader`
     */
    html: () => Loader;
    /**
     * Returns {@link Loader} for `remark-loader`
     */
    md: () => Loader;
    /**
     * Returns {@link Loader} for `mini-css-extract-plugin.loader`
     */
    minicss: () => Loader;
    /**
     * Returns {@link Loader} for `resolve-url-loader`
     */
    "resolve-url": () => Loader;
    /**
     * Returns {@link Loader} for `style-loader`
     */
    style: () => Loader;
    /**
     * Returns {@link Loader} for `url-loader`
     */
    url: () => Loader;
    /**
     * Returns {@link Loader} for `xml-loader`
     */
    xml: () => Loader;
};

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 */
declare const font: () => Rule;

/**
 * Returns {@link Rule} for `.html` handling
 */
declare const html: () => Rule;

/**
 * Returns {@link Rule} for `asset/resource`
 */
declare const image: () => Rule;

/**
 * Item class
 *
 * @public
 */
export declare class Item extends Item_2.Abstract implements Item_2.Interface {
    /**
     * Loader
     *
     * @public
     */
    loader: Factory<[Framework_2], Loader_2.Interface>;
    /**
     * Loader options
     *
     * @public
     */
    options: Factory<[Framework_2], Item_2.Options>;
    /**
     * Class constructor
     *
     * @param options - {@link Base.Options}
     */
    constructor({ loader, options, }: Item_2.ConstructorOptions);
    /**
     * {@inheritDoc @roots/Framework-Framework#Item.Abstract.getLoader}
     *
     * @public
     * @decorator `@bind`
     */
    getLoader(app: Framework_2): Loader_2.Interface;
    /**
     * @public
     * @decorator `@bind`
     */
    setLoader(loader: Maybe<[Framework_2], Loader_2.Interface>): void;
    /**
     * @public
     * @decorator `@bind`
     */
    setOptions(options: Maybe<[Framework_2], Item_2.Options>): void;
    /**
     * @public
     * @decorator `@bind`
     */
    mergeOptions(options: Item_2.Options, app: Framework_2): void;
    /**
     * @public
     * @decorator `@bind`
     */
    make(app: Framework_2): Item_2.Output;
}

declare namespace items {
    export {
        _default as default
    }
}
export { items }

/**
 * Returns {@link Rule} for `.js` handling
 */
declare const js: () => Rule;

/**
 * Returns {@link Rule} for `.jsonc` handling
 */
declare const json5: () => Rule;

/**
 * Framework Loader
 *
 * @public
 */
export declare class Loader extends Framework.Loader.Abstract implements Framework.Loader.Interface {
    /**
     * Factory returning the loader path
     *
     * @public
     */
    src: Framework.Factory<[Framework_2], string>;
    /**
     * Class constructor
     *
     * @param src - Either a factory returning a string or a literal string
     *
     * @public
     */
    constructor(src: Framework.Maybe<[Framework_2], string>);
    /**
     * Factory producing the final loader path
     *
     * @param app - {@link @roots/bud-Bud#Bud}
     * @returns final loader path
     *
     * @public
     * @decorator `@bind`
     */
    make(app: Framework_2): string;
    /**
     * Ensure that a userInput is assigned to the class as a {@link @roots/bud-Bud#Factory | Factory}
     *
     * @param input - input value
     * @returns normalized value from user input
     *
     * @public
     */
    normalizeInput<T = any>(input: Framework.Maybe<[Framework_2], T>): Framework.Factory<[Framework_2], T>;
}

declare namespace loaders {
    export {
        _default_2 as default
    }
}
export { loaders }

/**
 * Framework Rule
 *
 * @public
 */
export declare class Rule extends Rule_2.Abstract implements Rule_2.Interface {
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
     *
     * @public
     */
    test: Factory<[Framework_2], RegExp>;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
     *
     * @public
     */
    use: Factory<[Framework_2], Item_2.Interface[]>;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
     *
     * @public
     */
    exclude: Factory<[Framework_2], RegExp>;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
     *
     * @public
     */
    type: Factory<[Framework_2], string>;
    /**
     * Generator factory
     *
     * @public
     */
    parser: Factory<[Framework_2], Rule_2.Parser>;
    /**
     * Generator factory
     *
     * @public
     */
    generator: Factory<[Framework_2], any>;
    /**
     * Class constructor
     *
     * @public
     */
    constructor({ test, use, exclude, type, parser, generator, }: Rule_2.Options);
    /**
     *
     * @param app - {@link @roots/bud-framework#Framework | Framework}
     * @returns
     *
     * @public
     * @decorator `@bind`
     */
    getTest(app: Framework_2): RegExp;
    setTest(test: RegExp | ((app: Framework_2) => RegExp)): void;
    getParser(app: Framework_2): Rule_2.Parser;
    setParser(parser: Maybe<[Framework_2], Rule_2.Parser>): void;
    getUse(app: Framework_2): Item_2.Interface[];
    setUse(use: Maybe<[Framework_2], Item_2.Interface[]>): void;
    getExclude(app: Framework_2): RegExp;
    setExclude(exclude: Maybe<[Framework_2], RegExp>): void;
    getType(app: Framework_2): string;
    setType(type: any): void;
    getGenerator(app: Framework_2): any;
    setGenerator(generator: any): void;
    /**
     * Produce final Base output
     *
     * @param app - {@link @roots/bud-framework#Framework}
     * @returns finalized rule
     *
     * @public
     * @decorator `@bind`
     */
    make(app: Framework_2): Rule_2.Output;
}

declare namespace rules {
    export {
        image,
        font,
        svg,
        html,
        csv,
        xml,
        toml,
        yml,
        json5,
        css,
        js
    }
}
export { rules }

/**
 * Returns {@link Rule} for `.svg` handling
 */
declare const svg: () => Rule;

/**
 * Returns {@link Rule} for `.toml` handling
 */
declare const toml: () => Rule;

/**
 * Returns {@link Rule} for `.xml` handling
 */
declare const xml: () => Rule;

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 */
declare const yml: () => Rule;

export { }
