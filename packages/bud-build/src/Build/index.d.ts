/// <reference types="webpack" />
import type { Framework, Loader, Item, Rule } from '@roots/bud-typings';
import Service from './Service';
export declare type Configuration = Framework.Webpack.Configuration;
/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export default class extends Service implements Framework.Build {
    /**
     * ## bud.build.builders [🏠 Internal]
     *
     * Collection of functions processing loaders, items and rules
     * into a finalized webpack configuration.
     */
    builders: Partial<Framework.Build.Builder>;
    /**
     * ## bud.build.loaders
     *
     * Container of available loaders.
     *
     * @see {webpack.Loader}
     */
    loaders: Framework.Container;
    /**
     * ## bud.build.items
     *
     * Container of available RuleSetRule['use'] items.
     *
     * @see {webpack.Configuration}
     */
    items: Framework.Container;
    /**
     * ## bud.build.rules
     *
     * Container of available RuleSetRules
     *
     * @see {webpack.Configuration}
     */
    rules: Framework.Container;
    /**
     * Service registration
     */
    register(): void;
    /**
     * ## bud.build.make
     *
     * Produce a final webpack config.
     */
    make(): Configuration;
    /**
     * ### bud.build.filterEmpty [🏠 Internal]
     *
     * Filter rubbish config items.
     */
    filterEmpty(object: Partial<Configuration>): Partial<Configuration>;
    /**
     * ### bud.build.getLoader
     *
     * Get a loader from the store.
     */
    getLoader(name: string): Loader;
    /**
     * ### bud.build.setLoader
     *
     * Set a loader to the store. Returns the set loader.
     */
    setLoader(name: string, loader: Framework.Loader): Framework.Loader;
    /**
     * ### bud.build.getItem
     *
     * Get an item  from the store.
     */
    getItem(name: string): Item;
    /**
     * ### bud.build.setItem
     *
     * Set an item to the store. Returns the set item.
     */
    setItem(name: string, module: Item): Item;
    /**
     * ### bud.build.getRule
     *
     * Get a rule from the store.
     */
    getRule(name: string): Rule;
    /**
     * ### bud.build.setRule
     *
     * Set a rule to the store. Returns the set rule.
     */
    setRule(name: string, module: Rule): Rule;
}
//# sourceMappingURL=index.d.ts.map