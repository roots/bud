/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * This package provides the Bud class and is the main entrypoint for most projects
 * interfacing with Bud.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @example
 * Example configuration file (`bud.config.js`).
 * This is run by invoking `$ bud build` in the terminal.
 *
 * ```js
 * module.exports = app =>
 *   app
 *   .template({
 *     favicon: app.path('src', 'favicon.ico'),
 *     minify: false,
 *   })
 *   .entry('app', 'index.js')
 * ```
 *
 * @example
 * Instantiate `Bud` from node using the `factory` function:
 *
 * ```js
 * import {factory} from '@roots/bud'
 *
 * const bud = factory()
 *
 * bud.run() // run build
 * ```
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @packageDocumentation
 */

import { Api as Api_2 } from '@roots/bud-api';
import { Build as Build_2 } from '@roots/bud-build';
import { Cache as Cache_3 } from '@roots/bud-cache';
import { Compiler as Compiler_2 } from '@roots/bud-compiler';
import { CompilerPlugin } from '@roots/bud-framework/types/Extensions/Extension';
import type { Configuration } from '@roots/bud-framework';
import { Container } from '@roots/container';
import { Dashboard as Dashboard_2 } from '@roots/bud-dashboard';
import { Dependencies as Dependencies_2 } from '@roots/dependencies';
import type { Env as Env_2 } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework';
import { Extensions as Extensions_2 } from '@roots/bud-extensions';
import { Framework } from '@roots/bud-framework';
import * as Framework_2 from '@roots/bud-framework';
import { Hooks as Hooks_2 } from '@roots/bud-hooks';
import { Hooks as Hooks_3 } from '@roots/bud-framework';
import type { Peers as Peers_2 } from '@roots/bud-framework';
import { Server as Server_2 } from '@roots/bud-server';
import { Service as Service_2 } from '@roots/bud-framework';

/**
 * The API class binds all the facade functions provided by the package
 * and exposes them as a single object.
 *
 * @public
 */
declare class Api extends Api_2 {
    /**
     * Service identifier
     *
     * @public
     */
    ident: string;
}

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public
 */
export declare class Bud extends Framework {
    /* Excluded from this release type: implementation */
    /**
     * Container of child instances
     *
     * @remarks
     * Is `null` if the current instance is a child instance.
     *
     * @public
     */
    children: Container<Record<string, Bud>>;
    /**
     * Parent {@link Bud} instance
     *
     * @remarks
     * Is `null` if the current instance is the parent instance.
     *
     * @readonly @public
     */
    root: Bud | null;
    /**
     * True when current instance is the parent instance
     *
     * @readonly
     */
    get isRoot(): boolean;
    /**
     * True when current instance is a child instance
     *
     * @readonly
     */
    get isChild(): boolean;
    /**
     * True when instance has children
     *
     * @readonly
     */
    get hasChildren(): boolean;
    /**
     * API service container
     *
     * @public
     */
    api: Service.Api;
    /**
     * Build service
     *
     * @public
     */
    build: Service.Build;
    /**
     * Cache service
     *
     * @public
     */
    cache: Service.Cache;
    /**
     * Dashboard service
     *
     * @public
     */
    dashboard: Service.Dashboard;
    /**
     * Dependencies service
     *
     * @public
     */
    dependencies: Service.Dependencies;
    /**
     * Env service
     *
     * @public
     */
    env: Service.Env;
    /**
     * Extensions service
     *
     * @public
     */
    extensions: Service.Extensions;
    /**
     * Project service
     *
     * @public
     */
    project: Service.Project;
}

/**
 * @public
 */
export declare namespace Bud {
    /**
     * Bud constructor options
     *
     * @public
     */
    export type Options = Framework_2.Options;
}

/**
 * Build service class
 *
 * @public
 */
declare class Build extends Build_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
}

declare class Cache_2 extends Cache_3 implements Service_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
}

declare class Compiler extends Compiler_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
}

/**
 * Bud configuration defaults
 *
 * @public
 */
export declare const config: Configuration;

declare class Dashboard extends Dashboard_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
}

/**
 * Bud Dependencies Service class
 *
 * @public
 */
declare class Dependencies extends Framework_2.Service implements Framework_2.Dependencies {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
    /**
     * Dependencies installation manager
     *
     * @public
     */
    client: Dependencies_2['client'];
    /**
     * Record of installed packages
     *
     * @public
     */
    installed: Array<[string, string]>;
    /**
     * {@link @roots/bud-framework#Service.register}
     *
     * @public
     * @decorator `@bind`
     */
    register(): Promise<void>;
    /**
     * Installs all the things
     *
     * @param deps - dependencies to install
     *
     * @public
     * @decorator `@bind`
     */
    install(dependencies: {
        name: string;
        version: string;
    }[]): Promise<void>;
}

/**
 * Env service
 *
 * @public
 */
declare class Env extends Service_2<Record<string, any>> implements Env_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
    /**
     * Path to .env file
     *
     * @public @readonly
     */
    get envPath(): string;
    /**
     * Bootstrap event callback
     *
     * @public
     * @decorator `@bind`
     */
    bootstrap(): Promise<void>;
    /**
     * Retrieve parsed env object
     *
     * @public
     * @decorator `@bind`
     */
    getParsedEnv(): Record<string, any>;
    /**
     * Get entries from .env which include `APP_PUBLIC` in their name
     *
     * @public
     * @decorator `@bind`
     */
    getPublicEnv(): Record<string, any>;
}

/**
 * Extensions service
 *
 * @public
 */
declare class Extensions extends Extensions_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
    repository: Record<string, CompilerPlugin<any, Record<string, any>>>;
}

/**
 * Built-in extensions factory
 *
 * @returns Records of built-in compiler plugins
 */
export declare function extensions(): Record<string, Extension.CompilerPlugin>;

/**
 * Create a {@link Bud} instance programatically
 *
 * @example
 * ```ts
 * const bud = factory()
 * ```
 *
 * @public
 */
export declare function factory(overrides?: Bud.Options): Promise<Bud>;

export { Framework }

/**
 * Hooks service
 *
 * @public
 */
declare class Hooks extends Hooks_2 implements Hooks_3, Service_2 {
    /**
     * Service identifier
     *
     * @public
     */
    ident: string;
    /**
     * Registr lifecycle hook
     *
     * @remarks
     * Register hooks for each {@link Framework.Locations} key
     *
     * @public
     */
    bootstrap({ store }: {
        store: any;
    }): Promise<void>;
}

/**
 * Peers service class
 *
 * @public
 */
declare class Peers implements Peers_2.Interface {
    app: Framework;
    /**
     * Log helper
     *
     * @public
     */
    get log(): Service_2['log'];
    /**
     * Class constructor
     *
     * @public
     */
    constructor(app: Framework);
    /**
     * Returns path for a module name (if findable)
     *
     * @public
     * @decorator `@bind`
     */
    getPackageManifestPath(name: string): Promise<string>;
    /**
     * Returns manifest for a module from name (if findable)
     *
     * @public
     * @decorator `@bind`
     */
    getManifest(name: string): Promise<any>;
    /**
     * Returns true if a module is a bud
     *
     * @public
     * @decorator `@bind`
     */
    isExtension(name: string): boolean;
    /**
     * Plumbs project dependencies and gathers data
     * on bud related modules
     *
     * @public
     * @decorator `@bind`
     */
    discover(projectModuleType: 'dependencies' | 'devDependencies'): Promise<this>;
    /**
     * Profile extension
     *
     * @remarks
     * Given a manifest, will separate peers
     * and extensions for further processing.
     *
     * If an extension requires another extension, it will call
     * itself recursively until it reaches bottom.
     *
     * If two extensions require one another it will not iterate
     * infinitely as it checks if an extension exists before
     * recursing.
     *
     * @public
     * @decorator `@bind`
     */
    profileExtension(name: string): Promise<void>;
}

/**
 * Project service class
 *
 * @public
 */
declare class Project extends Framework_2.Service implements Framework_2.Project.Interface {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
    /**
     * Project peer dependencies manager
     *
     * @public
     */
    peers: Peers;
    repository: repository;
    get profilePath(): string;
    /* Excluded from this release type: bootstrap */
    /* Excluded from this release type: register */
    /**
     * Service boot event
     *
     * @public
     * @decorator `@bind`
     */
    boot(): Promise<void>;
    /**
     * Read project package.json and set peer deps
     *
     * @public
     * @decorator `@bind`
     */
    resolvePeers(): Promise<void>;
    /**
     * Read manifest
     *
     * @public
     */
    loadManifest(): Promise<void>;
    /**
     * Returns true if a dependency is listed in the project manifest
     *
     * @public
     * @decorator `@bind`
     */
    hasPeerDependency(pkg: string): boolean;
    /**
     * @public
     */
    buildProfile(): Promise<void>;
    /**
     * @public
     */
    writeProfile(): Promise<void>;
    readProfile(): Promise<any>;
    searchConfigs(): Promise<void>;
}

declare interface repository {
    cache: {
        hash: null;
    };
    cli: {
        args: any;
        argv: Array<string>;
        flags: Record<string, any>;
        metadata: Record<string, any>;
        raw: Array<Record<string, string>>;
    };
    configs: {
        dynamic: {
            global?: Array<string>;
            conditional?: Array<string>;
        };
        json: {
            global: Array<Record<string, any>>;
            conditional: Array<Record<string, any>>;
        };
    };
    manifestPath: string;
    manifest: Record<string, any>;
    installed: Record<string, string>;
    unmet: Array<string>;
    peers: {
        [key: string]: {
            name: string;
            version: string;
        };
    };
    /**
     * Installed extensions
     */
    extensions: {
        [key: string]: {
            bud: {
                type: 'extension' | 'preset';
                peers: Array<string>;
            };
            name: string;
            version: string;
            path: string;
            devDependencies: Record<string, string>;
            dependencies: Record<string, string>;
        };
    };
    /**
     * @see webpack.resolve.modules
     */
    resolve: Array<string>;
    /**
     * @see webpack.cache.buildDependencies
     */
    dependencies: Array<string>;
}

/**
 * Project repository
 *
 * @public
 */
declare const repository: repository;

/**
 * Server service
 *
 * @public
 */
declare class Server extends Server_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
    /**
     * Service register callback
     *
     * @public
     */
    bootstrap(): Promise<void>;
}

declare namespace Service {
    export {
        services,
        Api,
        Build,
        Cache_2 as Cache,
        Compiler,
        Dashboard,
        Dependencies,
        Env,
        Extensions,
        Hooks,
        Project,
        Server
    }
}

/* Excluded from this release type: services */

export { }
