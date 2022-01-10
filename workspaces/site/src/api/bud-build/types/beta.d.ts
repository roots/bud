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
 *  @packageDocumentation
 */

import { Build as Build_2 } from '@roots/bud-framework';
import { Configuration } from 'webpack';
import { Factory } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import * as Framework_2 from '@roots/bud-framework';
import { Interface } from '@roots/bud-framework/types/Build/Rule';
import { Item as Item_2 } from '@roots/bud-framework';
import { Items } from '@roots/bud-framework';
import { Loader as Loader_2 } from '@roots/bud-framework';
import { Loaders } from '@roots/bud-framework';
import { Maybe } from '@roots/bud-framework';
import { Rule as Rule_2 } from '@roots/bud-framework';
import { Rules } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
import type * as Webpack from 'webpack';

declare class Base {
    normalizeInput<T = any>(input: T | ((app: Framework) => T)): (app: Framework) => T;
}

/**
 * Webpack configuration builder class
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
     * Registered rules
     *
     * @public
     */
    rules: Rules;
    /**
     * Registered items
     *
     * @public
     */
    items: Items;
    /**
     * Service booted event
     *
     * @public
     * @decorator `@bind`
     */
    registered(): Promise<void>;
    /**
     * Make webpack configuration
     *
     * @public
     * @decorator `@bind`
     */
    make(): Promise<Webpack.Configuration>;
    /**
     * Service register event
     *
     * @public
     * @decorator `@bind`
     */
    register(): Promise<void>;
    /**
     * Set a rule
     *
     * @param name - rule key
     * @param constructorProperties - rule constructor properties
     * @returns the rule
     *
     * @public
     * @decorator `@bind`
     */
    setRule(name: string, constructorProperties?: any): Rule;
    /**
     * Make a rule
     *
     * @param constructorProperties - rule constructor properties
     * @returns the rule
     *
     * @public
     * @decorator `@bind`
     */
    makeRule(constructorProperties?: any): Rule;
    /**
     * Write final configuration to storage directory
     *
     * @public
     * @decorator `@bind`
     */
    writeFinalConfig(): Promise<void>;
}

/**
 * .css rule
 *
 * @public
 */
declare const css: (app: Framework) => Interface;

/**
 * .module.css rule
 *
 * @public
 */
declare const cssModule: (app: Framework) => Interface;

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
declare const csv: (app: Framework) => Interface;

declare const _default: {
    /**
     * .css handler factory
     *
     * @public
     */
    css: () => Item;
    /**
     * .css handler factory
     *
     * @public
     */
    cssModule: () => Item;
    /**
     * .csv handler factory
     *
     * @public
     */
    csv: () => Item;
    /**
     * .html handler factory
     *
     * @public
     */
    html: () => Item;
    /**
     * Factory {@link Item} for style
     *
     * @public
     */
    style: () => Item;
    /**
     * Factory {@link Item} for markdown
     *
     * @public
     */
    md: () => Item;
    /**
     * Factory {@link Item} for minicss-extract-plugin
     *
     * @public
     */
    minicss: () => Item;
    /**
     * Factory {@link Item} for raw
     *
     * @public
     */
    raw: () => Item;
    /**
     * Factory {@link Item} for file
     *
     * @public
     */
    file: () => Item;
    /**
     * Factory {@link Item} resolve-url
     *
     * @public
     */
    "resolve-url": () => Item;
    /**
     * Factory {@link Item} for xml
     *
     * @public
     */
    xml: () => Item;
};

declare const _default_2: {
    /**
     * Returns {@link Loader} from `css-loader`
     * @public
     */
    css: () => Loader;
    /**
     * Returns {@link Loader} for `csv-loader`
     * @public
     */
    csv: () => Loader;
    /**
     * Returns {@link Loader} for `file-loader`
     * @public
     */
    file: () => Loader;
    /**
     * Returns {@link Loader} for `html-loader`
     * @public
     */
    html: () => Loader;
    /**
     * Returns {@link Loader} for `remark-loader`
     * @public
     */
    md: () => Loader;
    /**
     * Returns {@link Loader} for `mini-css-extract-plugin.loader`
     * @public
     */
    minicss: () => Loader;
    /**
     * Returns {@link Loader} for `resolve-url-loader`
     * @public
     */
    "resolve-url": () => Loader;
    /**
     * Returns {@link Loader} for `style-loader`
     * @public
     */
    style: () => Loader;
    /**
     * Returns {@link Loader} for `url-loader`
     * @public
     */
    url: () => Loader;
    /**
     * Returns {@link Loader} for `xml-loader`
     * @public
     */
    xml: () => Loader;
};

/**
 * .woff, .woff2, .otf rule
 *
 * @public
 */
declare const font: (app: Framework) => Interface;

/**
 * Returns {@link Rule} for `.html` handling
 *
 * @public
 */
declare const html: (app: Framework) => Interface;

/**
 * .jpg, .jpeg, .png, .gif rule
 *
 * @public
 */
declare const image: (app: Framework) => Rule;

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
    loader: Factory<[Framework], Loader_2.Interface>;
    /**
     * Loader options
     *
     * @public
     */
    options: Factory<[Framework], Item_2.Options>;
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
    getLoader(app: Framework): Loader_2.Interface;
    /**
     * @public
     * @decorator `@bind`
     */
    setLoader(loader: Maybe<[Framework], Loader_2.Interface>): void;
    /**
     * @public
     * @decorator `@bind`
     */
    setOptions(options: Maybe<[Framework], Item_2.Options>): void;
    /**
     * @public
     * @decorator `@bind`
     */
    mergeOptions(options: Item_2.Options, app: Framework): void;
    /**
     * @public
     * @decorator `@bind`
     */
    make(app: Framework): Item_2.Output;
}

declare namespace items {
    export {
        _default as default
    }
}
export { items }

/**
 * .js rule
 *
 * @public
 */
declare const js: (app: Framework) => Interface;

/**
 * Returns {@link Rule} for `.jsonc` handling
 *
 * @public
 */
declare const json: (app: Framework) => Interface;

/**
 * Framework Loader
 *
 * @public
 */
export declare class Loader extends Framework_2.Loader.Abstract implements Framework_2.Loader.Interface {
    /**
     * Factory returning the loader path
     *
     * @public
     */
    src: Framework_2.Factory<[Framework], string>;
    /**
     * Class constructor
     *
     * @param src - Either a factory returning a string or a literal string
     *
     * @public
     */
    constructor(src: Framework_2.Maybe<[Framework], string>);
    /**
     * Factory producing the final loader path
     *
     * @param app - {@link @roots/bud-Bud#Bud}
     * @returns final loader path
     *
     * @public
     * @decorator `@bind`
     */
    make(app: Framework): string;
    /**
     * Ensure that a userInput is assigned to the class as a {@link @roots/bud-Bud#Factory | Factory}
     *
     * @param input - input value
     * @returns normalized value from user input
     *
     * @public
     */
    normalizeInput<T = any>(input: Framework_2.Maybe<[Framework], T>): Framework_2.Factory<[Framework], T>;
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
export declare class Rule extends Base implements Rule_2.Interface {
    app: Framework;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract.test}
     *
     * @public
     */
    test?: (app: Framework) => RegExp;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract.use}
     *
     * @public
     */
    use?: (app: Framework) => Item_2.Interface[];
    /**
     * Include paths
     */
    include?: (app: Framework) => string;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract.exclude}
     *
     * @public
     */
    exclude?: (app: Framework) => RegExp;
    /**
     * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
     *
     * @public
     */
    type?: (app: Framework) => string;
    /**
     * Generator factory
     *
     * @public
     */
    parser?: (app: Framework) => Rule_2.Parser;
    /**
     * Generator factory
     *
     * @public
     */
    generator?: (app: Framework) => any;
    /**
     * Class constructor
     *
     * @public
     */
    constructor(app: Framework, options: Rule_2.Options);
    /**
     * Test value
     *
     * @param app - Framework instance
     *
     * @public
     * @decorator `@bind`
     */
    getTest(): RegExp;
    /**
     * Set test value
     *
     * @public
     * @decorator `@bind`
     */
    setTest(test: RegExp | (() => RegExp)): Rule;
    /**
     * Get parser value
     *
     * @public
     * @decorator `@bind`
     */
    getParser(): Rule_2.Parser;
    /**
     * Set parser value
     *
     * @public
     * @decorator `@bind`
     */
    setParser(parser: Maybe<[Framework], Rule_2.Parser>): Rule;
    /**
     * Get use value
     *
     * @public
     * @decorator `@bind`
     */
    getUse(): Item_2.Interface[];
    /**
     * Set use value
     *
     * @public
     * @decorator `@bind`
     */
    setUse(use: Maybe<[Framework], Item_2.Interface[]>): Rule;
    /**
     * Get exclude value
     *
     * @public
     * @decorator `@bind`
     */
    getInclude(): string;
    /**
     * Set exclude value
     *
     * @public
     * @decorator `@bind`
     */
    setInclude(include: Maybe<[Framework], string>): Rule;
    /**
     * Get exclude value
     *
     * @public
     * @decorator `@bind`
     */
    getExclude(): RegExp;
    /**
     * Set exclude value
     *
     * @public
     * @decorator `@bind`
     */
    setExclude(exclude: Maybe<[Framework], RegExp>): Rule;
    /**
     * Get type value
     *
     * @public
     * @decorator `@bind`
     */
    getType(): string;
    /**
     * Set type value
     *
     * @public
     * @decorator `@bind`
     */
    setType(type: any): Rule;
    /**
     * Get generator value
     *
     * @public
     * @decorator `@bind`
     */
    getGenerator(): any;
    /**
     * Set generator value
     *
     * @public
     * @decorator `@bind`
     */
    setGenerator(generator: Rule_2.Interface['generator'] | ((app: Framework) => Rule_2.Interface['generator'])): Rule;
    /**
     * Produce final Base output
     *
     * @param app - {@link @roots/bud-framework#Framework}
     * @returns finalized rule
     *
     * @public
     * @decorator `@bind`
     */
    make(): Partial<{
        test: RegExp;
        use?: {
            loader: string; /**
            * {@inheritDoc @roots/bud-framework#Rule.Abstract."type"}
            *
            * @public
            */
            options?: {
                [key: string]: any;
            };
        }[];
        exclude?: RegExp;
        type?: string;
        parser?: Rule_2.Parser;
        /**
         * Generator factory
         *
         * @public
         */
        generator?: any;
    }>;
}

declare namespace rules {
    export {
        js,
        css,
        cssModule,
        image,
        webp,
        svg,
        font,
        json,
        yml,
        html,
        csv,
        xml,
        toml
    }
}
export { rules }

/**
 * Returns {@link Rule} for `.woff`/`.otf` handling
 * .svg rule
 *
 * @public
 */
declare const svg: (app: Framework) => Interface;

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
declare const toml: (app: Framework) => Interface;

/**
 * .webp assets factorry
 *
 * @remarks
 * Returns {@link Rule} for `asset/resource`
 *
 * @public
 */
declare const webp: (app: Framework) => Interface;

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
declare const xml: (app: Framework) => Interface;

/**
 * Returns {@link Rule} for `.yml` / `.yaml` handling
 *
 * @public
 */
declare const yml: (app: Framework) => Interface;

export { }
