import type * as Webpack from 'webpack';
import type { Framework, Service } from './';
/**
 * {@link Service}: Generates {@link Webpack.Configuration} from {@link Framework.Rules}
 *
 * @remarks
 * The most current {@link Webpack.Configuration} is accessible through {@link Build.config}. If {@link Build.Config}
 * has never been built before, accessing the property will automatically build it.
 *
 * If the configuration has changed {@link Build.rebuild} can be called to regenerate the configuration.
 *
 * Most configuration values are produced using {@link Framework.Hooks} callbacks. They are keyed with strings starting `build/`.
 * So, you could access the {@link Webpack.Configuration['entry']} with `bud.hooks.filter('build/entry')`
 *
 * For typescript users who wish to maintain typing accuracy while adding support for
 * various loaders, items and rules:
 *
 * - {@link Build.loaders} should be declared by augmenting the {@link Framework.Loaders} interface
 * - {@link Build.items} should be declared by augmenting the {@link Framework.Items} interface
 * - {@link Build.rules} should be declared by augmenting the {@link Framework.Rules} interface
 *
 * @example
 * Access the config
 *
 * ```js
 * build.config
 * ```
 *
 * @example
 * Rebuild the configuration
 *
 * ```js
 * build.rebuild()
 * ```
 *
 * @example
 * Filter the Webpack configuration.entry value
 *
 * ```js
 * bud.hooks.filter('build/entry')
 * ```
 */
interface Build extends Service {
    /**
     * {@link Build.Loaders Loader registry}
     */
    loaders: Build.Loaders;
    /**
     * {@link Build.Items Item registry}
     */
    items: Build.Items;
    /**
     * {@link Build.Rules Rule registry}
     */
    rules: Build.Rules;
    /**
     * Accesses {@link Webpack.Configuration}
     */
    config: Webpack.Configuration;
    /**
     * Regenerate {@link Webpack.Configuration}
     */
    rebuild(): Webpack.Configuration;
}
declare namespace Build {
    /**
     * Registered loaders
     */
    interface Loaders extends Framework.Index<Loader> {
        [key: string]: Loader;
    }
    /**
     * Registered items
     */
    interface Items extends Framework.Index<Item> {
        [key: string]: Item;
    }
    /**
     * Registered rules
     */
    interface Rules extends Framework.Index<Rule> {
        [key: string]: Rule;
    }
    /**
     * Makes a Webpack loader
     */
    interface Loader {
        /**
         * Returns {@link Loader.Output}
         */
        make(app: Framework): string;
    }
    /**
     * Makes a {@link Webpack.RuleSetRule.use} item
     */
    interface Item {
        /**
         * Set the {@link Loader}
         */
        setLoader(loader: (app?: Framework) => Build.Loader): void;
        /**
         * Set the {@link Build.Item.OptionsFn}
         */
        setOptions(options: Build.Item.OptionsFn): void;
        /**
         * Merge {@link Build.Item.Options} with existing options
         */
        mergeOptions(options: Build.Item.Options, app: Framework): void;
        /**
         * Makes the {@link Webpack.RuleSetRule.use} item
         */
        make(app: Framework): Build.Item.Output;
    }
    /**
     * Makes a {@link RuleSetRule}
     */
    interface Rule {
        /**
         * Wrapping {@link Webpack.RuleSetRule.test}
         */
        test?: (app?: Framework) => Webpack.RuleSetRule['test'];
        /**
         * Returns an array of {@link Build.Item} values
         *
         * @remarks
         * each of the returned values is to be built with {@link Build.Item.make}
         * to produce {@link Webpack.RuleSetRule.use} compatible output.
         */
        use?: (app?: Framework) => Item[];
        /**
         * Get the value of `test`
         */
        getTest(app: Framework): RegExp;
        /**
         * Set the value of `test`
         */
        setTest(test: RegExp | Rule.TestFn): void;
        /**
         * Get the value of `use`
         */
        getUse(app: Framework): Item[];
        /**
         * Set the value of `use`
         */
        setUse(use: Rule.UseFn): void;
        /**
         * Get the value of `exclude`
         */
        getExclude(app: Framework): Rule.Output['exclude'];
        /**
         * Set the value of `exclude`
         */
        setExclude(exclude: Rule.ExcludeFn | RegExp): void;
        /**
         * Get the value of `type`
         */
        getType(app: Framework): Rule.Output['type'];
        /**
         * Set the value of `type`
         */
        setType(type: string | Rule.TypeFn): void;
        /**
         * Get the value of `parser`
         */
        getParser(app: Framework): Rule.Parser;
        /**
         * Set the value of `parser`
         */
        setParser(parser: Rule.Parser | Rule.ParserFn): void;
        /**
         * Get the value of `generator`
         */
        getGenerator(app: Framework): any;
        /**
         * Set the value of `generator`
         */
        setGenerator(Generator: any | Rule.GeneratorFn): void;
        /**
         * Returns final {@link RuleSetRule} for inclusion in {@link Build.config}
         */
        make(app: Framework): Rule.Output | Webpack.RuleSetRule;
    }
    namespace Item {
        type LoaderFn = (app?: Framework) => Loader;
        type OptionsFn = (app?: Framework) => Options;
        type Options = {
            [key: string]: any;
        };
        interface ConstructorOptions {
            loader: Loader | LoaderFn;
            options?: OptionsFn | Options;
        }
        interface Output {
            loader: Build.Loader.Output;
            options?: {
                [key: string]: any;
            };
        }
    }
    namespace Loader {
        type Output = string;
        type Src = (app?: Framework) => Output;
        type Input = Src | Output;
    }
    namespace Rule {
        type TestFn = (app?: Framework) => RegExp;
        type UseFn = (app?: Framework) => Item[];
        type ExcludeFn = (app?: Framework) => RegExp;
        type TypeFn = (app?: Framework) => string;
        interface Parser {
            parse: (input?: string) => any;
        }
        type ParserFn = (app?: Framework) => Parser;
        type GeneratorFn = (app?: Framework) => any;
        /**
         * Rule.Options
         */
        interface Options {
            test: RegExp | TestFn;
            use?: Item[] | UseFn;
            exclude?: RegExp | ExcludeFn;
            type?: string | TypeFn;
            parser?: ParserFn | Parser;
            generator?: GeneratorFn | any;
        }
        /**
         * Rule.Output
         *
         * @remarks
         * Output conforming to Webpack {@link RuleSetRule} interface
         */
        interface Output {
            test: RegExp;
            use?: {
                loader: string;
                options?: {
                    [key: string]: any;
                };
            }[];
            exclude?: RegExp;
            type?: string;
            parser?: Parser;
            generator?: any;
        }
    }
}
export { Build };
//# sourceMappingURL=Build.d.ts.map