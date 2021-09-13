/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 *
 * The {@link @roots/bud-extensions# | @roots/bud-extensions} is a concrete
 * implementation of the {@link @roots/bud-framework#Extensions | Framework.Extensions} interface
 *
 * @core @packageDocumentation
 */

import { Extensions as Extensions_2 } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Hooks } from '@roots/bud-framework';
import { Module } from '@roots/bud-framework';
import { PluginInstance } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
import { WebpackPlugin } from '@roots/bud-framework';

/**
 * Extension instance controller
 *
 * @public @core
 */
export declare class Extension implements Module {
    /* Excluded from this release type: _module */
    /* Excluded from this release type: _app */
    /**
     * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin}
     *
     * @public @readonly
     */
    get module(): Module;
    /**
     * The {@link @roots/bud-framework#Framework | Framework instance}
     *
     * @public @readonly
     */
    get app(): Framework;
    /**
     * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} name
     *
     * @public @readonly
     */
    get name(): keyof Framework.Extensions;
    /**
     * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} options
     *
     * @public
     */
    get options(): Module['options'];
    set options(options: Module['options']);
    /**
     * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} `when` property
     *
     * @public
     */
    get when(): Module.When;
    set when(when: Module.When);
    /**
     * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} `when` property
     *
     * @public
     */
    get make(): Module.Make;
    set make(make: Module.Make);
    /**
     * The {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} `apply` property
     *
     * @public @readonly
     */
    get apply(): any;
    /**
     * The class constructor
     *
     * @param app - The {@link @roots/bud-framework#Framework | Framework instance}
     * @param extension - The {@link @roots/bud-framework#Module | Module instance}
     */
    constructor(app: Framework, extension: Module);
    /**
     * Make a {@link @roots/bud-hooks#Hooks | Hooks} key from a {@link Extension.name}
     *
     * @remarks
     * This key must be registered with {@link @roots/bud-framework#Framework.Hooks | Framework.Hooks}
     *
     * @param key - The {@link Extension.name}
     *
     * @public
     * @decorator `@bind`
     */
    makeKey(key: `${keyof Framework.Extensions & string}`): Hooks.Name;
    /**
     * Get a {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} property value
     * after it has been passed through any {@link @roots/bud-framework#Hooks.filter | filter callbacks}
     *
     * @param key - The {@link Extension.name}
     *
     * @filter
     *
     * @public
     * @decorator `@bind`
     */
    get(key: `${keyof Framework.Extensions & string}`): any;
    /**
     * Set a {@link @roots/bud-framework#Module | Module} or {@link @roots/bud-framework#WebpackPlugin | WebpackPlugin} property value
     * after passing it through any {@link @roots/bud-framework#Hooks.on | hooks callbacks}
     *
     * @param key - The {@link Extension.name}
     * @param value - The new value
     *
     * @hook
     *
     * @public
     * @decorator `@bind`
     */
    set(key: `${keyof Framework.Extensions & string}`, value: any): void;
    /**
     * Extension registration event
     *
     * @remarks
     * Calls the {@link @roots/bud-framework#Module.register} callback
     *
     * @returns {@link Extension}
         *
         * @public @core
         * @decorator `@bind`
         */
     register(): Extension;
     /**
      * Extension boot event
      *
      * @remarks
      * Calls the {@link @roots/bud-framework#Module.boot} callback
      *
      * @returns {@link Extension}
          *
          * @public @core
          * @decorator `@bind`
          */
      boot(): this;
     }

     /**
      * Extensions Service
      *
      * @remarks
      * This class is a {@link @roots/bud-framework#Service | Service instance} for
      * managing {@link @roots/bud-framework#Framework | Framework} extensions
      *
      * A {@link @roots/bud-framework#Framework | Framework} extension is defined
      * as a {@link @roots/bud-framework#Module | Module} and is instantiated in
      * the container as an instance of the {@link Extension} class
      *
      * @core @public @container
      */
     export declare class Extensions extends Service<Partial<Framework.Extensions>> implements Extensions_2 {
         /**
          * {@inheritDoc @roots/bud-framework#Service.register}
          *
          * @override @public
          */
         name: string;
         /**
          * {@inheritDoc @roots/bud-framework#Service.register}
          *
          * @override @public
          */
         register(): void;
         /**
          * {@inheritDoc @roots/bud-framework#Service.boot}
          *
          * @override @public
          */
         boot(): void;
         /**
          * Add a module to the repository, transforming it into an {@link Extension} instance
          * in the process.
          *
          * @override @public
          */
         add(extension: Module): void;
         /**
          * Returns an array of {@link @roots/bud-framework#PluginInstance | plugin instances}
          * which have been registered to the {@link Extensions | Extensions container} and
          * are set to be used in the compilation
          *
          * @returns An array of {@link @roots/bud-framework#PluginInstance | plugin instances}
          *
          * @public
          * @decorator `@bind`
          */
         make(): PluginInstance[];
         /**
          * Returns extension instances which produce a Webpack plugin and are
          * set to be used in the next compilation
          *
          * @returns Array of {@link Extension} instances which produce Webpack plugins
          *
          * @public
          * @decorator `@bind`
          */
         getEligibleWebpackModules(): Extension[];
         /**
          * Registers an extension
          *
          * @remarks
          * Can be booted from its {@link @roots/bud-framework#Service.repository | Service.repository} key or
          * with the literal {@link @roots/bud-framework#Module | Module}
          *
          * @public
          * @decorator `@bind`
          */
         registerExtension(extension: Module | WebpackPlugin | `${keyof Framework.Extensions & string}`): void;
         /**
          * Boots a registered {@link Extension} instance
          *
          * @remarks
          * Can be booted from its {@link @roots/bud-framework#Service.repository | Service.repository} key or
          * with the literal {@link @roots/bud-framework#Module | Module}
          *
          * @public
          * @decorator `@bind`
          */
         bootExtension(extension: Module | WebpackPlugin | `${keyof Framework.Extensions & string}`): void;
     }

     export { }
