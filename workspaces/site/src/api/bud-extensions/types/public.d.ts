/**
 * The {@link @roots/bud-extensions#} package implements the {@link @roots/bud-framework#Extensions | Extensions interface}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 *  @packageDocumentation
 */

import { Extension as Extension_2 } from '@roots/bud-framework';
import { Extensions as Extensions_2 } from '@roots/bud-framework';
import { Framework } from '@roots/bud-framework';
import { Service } from '@roots/bud-framework';
import { Signale } from '@roots/bud-support';

/**
 * Extension instance controller
 *
 * @public
 */
export declare class Controller {
    /* Excluded from this release type: _app */
    /**
     * The application instance
     *
     * @public @readonly
     */
    get app(): Framework;
    /**
     * @public
     */
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
    /* Excluded from this release type: _module */
    /**
     * @public
     */
    log: typeof Service.prototype.log;
    /**
     * Controller constructor
     *
     * @public
     */
    constructor(_app: Framework, extension: Extension);
    /**
     * @public
     * @decorator `@bind`
     */
    get(key: string): any;
    /**
     * @public
     * @decorator `@bind`
     */
    set(key: string, value: any): void;
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
     * Mutate options
     *
     * @remarks
     * mutation fn receives a container of existing options and returns
     * an object or container of mutated options
     *
     * @param options - mutation fn
     * @public
     */
    mutateOptions(options: any): void;
    /**
     * Merge options
     *
     * @remarks
     * Supplied options must be an object or container of options to merge
     *
     * @param options - options to merge
     * @public
     */
    mergeOptions(options: any): void;
    /**
     * Merge option
     *
     * @remarks
     * Supplied options must be an object or container of options to merge
     *
     * @param key - option key
     * @param options - value to merge
     * @public
     */
    mergeOption(key: any, options: any): void;
    /**
     * Set an extension option
     *
     * @param key - option key
     * @param value - options value
     * @public
     */
    setOptions(value: any): Controller;
    /**
     * Set an extension option
     *
     * @param key - option key
     * @param value - options value
     * @public
     */
    setOption(key: any, value: any): void;
    /**
     * Get an extension option
     *
     * @param key - option key
     * @public
     */
    getOption(key: any): any;
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
     * @public
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
export declare class Extensions extends Service implements Extensions_2 {
    queue: any[];
    repository: {};
    /**
     * Controller factory
     *
     * @public
     */
    makeController(extension: Extension_2.Module | Promise<Extension_2.Module>): Controller;
    /**
     * @override
     * @public
     */
    boot(): Promise<void>;
    /**
     * Inject extension modules
     *
     * @public
     * @decorator `@bind`
     */
    injectExtensions(): Promise<void>;
    importExtension(extension: string): Promise<void>;
    setController(extension: any): Promise<void>;
    /**
     * @public
     */
    registerExtension(extension: Controller): Promise<void>;
    /**
     * @public
     */
    bootExtension(extension: Controller): Promise<void>;
    /**
     * @public
     */
    registerExtensions(): Promise<void>;
    /**
     * @public
     */
    bootExtensions(): Promise<void>;
    /**
     * Add a {@link Controller} to the container
     *
     * @public
     * @decorator `@bind`
     */
    add(extension: Extension_2.Module): Promise<void>;
    /**
     * Queue an extension to be added to the container before the build process.
     *
     * @remarks
     * Useful for extensions which cannot be added in an awaitable context (like a user config)
     *
     * @public
     * @decorator `@bind`
     */
    enqueue(extension: Extension_2.Module): Framework;
    /**
     * @public
     */
    processQueue(): Promise<void>;
    /**
     * Returns an array of plugin instances which have been registered to the
     * container and are set to be used in the compilation
     *
     * @returns An array of plugin instances
     *
     * @public
     * @decorator `@bind`
     */
    make(): Promise<{
        [key: string]: any;
        apply: CallableFunction;
    }[]>;
}

declare type Plugin_2 = Extension_2.CompilerPlugin;

export { }
