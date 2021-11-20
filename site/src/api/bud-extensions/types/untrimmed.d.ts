/**
 * The {@link @roots/bud-extensions#} package implements the {@link @roots/bud-framework#Extensions | Extensions interface}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @core @packageDocumentation @betaDocumentation
 */

import { Extension as Extension_2 } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import * as Framework_2 from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
import { Signale } from '@roots/bud-support';

/**
 * Extension instance controller
 *
 * @public @core
 */
export declare class Controller {
    /**
     * @internal
     */
    _app: () => Framework;
    /**
     * The application instance
     *
     * @public @readonly
     */
    get app(): Framework;
    meta: {
        instance: string;
        registered: boolean;
        booted: boolean;
    };
    get moduleLogger(): Signale;
    /**
     * Has registered
     *
     * @public
     */
    registered: boolean;
    /**
     * Has booted
     *
     * @public
     */
    booted: boolean;
    /**
     * @internal
     */
    _module: Extension | Plugin_2;
    /**
     * @public
     */
    log: typeof Service.prototype.log;
    /**
     * Controller constructor
     *
     * @public
     */
    constructor(_app: Framework, _module: Extension);
    /**
     * @public
     */
    get(key: string): any;
    /**
     * @public
     */
    set(key: string, value: any): void;
    /**
     * @public
     */
    filter(key: string, object: any): any;
    /**
     * Extension module name
     *
     * @public
     */
    get name(): string;
    set name(name: string);
    /**
     * Extension module options
     *
     * @public
     */
    get options(): any;
    /**
     * @public
     */
    set options(options: any);
    /**
     * Value determining if the extension should be utilized
     *
     * @public
     */
    make(): any;
    /**
     * Value determining if the extension should be utilized
     *
     * @public
     */
    get when(): boolean;
    /**
     * Value determining if the extension should be utilized
     *
     * @public
     */
    set when(when: boolean);
    /**
     * Extension registration event
     *
     * @remarks
     * Calls the {@link Extension} callback
     *
     * @public
     */
    register(): Promise<Controller>;
    /**
     * @public
     */
    api(): Promise<Controller>;
    /**
     * @public
     */
    mixin(): Promise<this>;
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
     boot(): Promise<this>;
    }

    declare type Extension = Extension_2.Module;

    /**
     * Extensions Service
     *
     * @remarks
     * Manages extension controllers
     *
     * @public
     */
    export declare class Extensions extends Framework_2.Service implements Framework_2.Extensions {
        queue: any[];
        repository: {};
        /**
         * Controller factory
         *
         * @public
         */
        makeController(extension: Framework_2.Extension.Module | Promise<Framework_2.Extension.Module>): Controller;
        /**
         * @override @public
         */
        registered(): Promise<void>;
        /**
         * @override @public
         */
        boot(): Promise<void>;
        /**
         * @public
         */
        booted(): Promise<void>;
        /**
         * @public
         */
        registerExtension(key: string): Promise<void>;
        /**
         * @public
         */
        bootExtension(key: string): Promise<void>;
        /**
         * @public
         */
        registerExtensions(): Promise<void>;
        /**
         * @public
         */
        bootExtensions(): Promise<void>;
        /**
         * Queue an extension to be added to the container before the build process.
         *
         * @remarks
         * Useful for extensions which cannot be added in an awaitable context (like a user config)
         *
         * @public
         * @decorator `@bind`
         */
        enqueue(extension: Framework_2.Extension.Module): void;
        /**
         * Add a {@link Controller} to the container
         *
         * @public
         * @decorator `@bind`
         */
        add(extension: Framework_2.Extension.Module): Promise<void>;
        /**
         * @public
         */
        processQueue(): Promise<void>;
        /**
         * Returns an array of plugin instances which have been registered to the
         * Extensions container and are set to be used in the compilation
         *
         * @returns An array of plugin instances
         *
         * @public
         * @decorator `@bind`
         */
        make(): {
            [key: string]: any;
            apply: CallableFunction;
        }[];
    }

    declare type Plugin_2 = Extension_2.CompilerPlugin;

    export { }
