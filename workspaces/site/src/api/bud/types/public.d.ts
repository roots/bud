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
import { Dashboard as Dashboard_2 } from '@roots/bud-dashboard';
import { Dependencies as Dependencies_2 } from '@roots/dependencies';
import type { Env as Env_2 } from '@roots/bud-framework';
import { Extension } from '@roots/bud-framework';
import { Extensions as Extensions_2 } from '@roots/bud-extensions';
import { Framework } from '@roots/bud-framework';
import * as Framework_2 from '@roots/bud-framework';
import { Hooks as Hooks_2 } from '@roots/bud-hooks';
import { Hooks as Hooks_3 } from '@roots/bud-framework';
import { Peers as Peers_2 } from '@roots/bud-framework';
import { Server as Server_2 } from '@roots/bud-server';
import { Service } from '@roots/bud-framework';
import type { Store } from '@roots/bud-framework';

/**
 * Directed adjacency list for project modules
 *
 * @public
 */
declare class AdjacencyList {
    manifests: Record<string, Dependency>;
    /**
     * Map of module keys to adjacent required modules
     *
     * @public
     */
    get modules(): AdjacentMap;
    /**
     * Class constructor
     *
     * @public
     */
    constructor(manifests: Record<string, Dependency>);
    /**
     * Whether a given key exists
     *
     * @public
     */
    has(key: string): Boolean;
    /**
     * Dependencies adjacent to a given key
     *
     * @public
     */
    adjacentTo(name: string): Set<string>;
    /**
     * Ordered dependencies from a given key
     *
     * @public
     */
    fromRoot(root: string): Array<Dependency>;
}

declare interface AdjacentMap extends Map<string, Set<string>> {
}

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
 * ⚡️ Bud
 *
 * @public
 */
export declare class Bud extends Framework {
    /* Excluded from this release type: implementation */
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

declare class Cache_2 extends Cache_3 implements Service {
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

declare class Dashboard extends Dashboard_2 {
    /**
     * Service ident
     *
     * @public
     */
    ident: string;
}

/**
 * Dependencies management service
 *
 * @public
 */
declare class Dependencies extends Framework_2.Service implements Framework_2.Dependencies {
    /* Excluded from this release type: ident */
    /**
     * Package manager client interface
     *
     * @public
     */
    client: Dependencies_2['client'];
    /* Excluded from this release type: register */
    /**
     * Installs all the things
     *
     * @param dep - dependencies to install
     *
     * @public
     * @decorator `@bind`
     */
    install(packages: {
        name: string;
        version: string;
    }[]): Promise<void>;
}

declare interface Dependency {
    name: string;
    requires: Array<[string, string]>;
    version?: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    resolvable?: boolean;
    bud?: {
        type: 'extension';
        peers: Array<string>;
    };
}

/**
 * Env service
 *
 * @public
 */
declare class Env extends Service<Record<string, any>> implements Env_2 {
    /* Excluded from this release type: ident */
    /**
     * Path to .env file
     *
     * @public @readonly
     */
    get envPath(): string;
    /* Excluded from this release type: bootstrap */
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
    /* Excluded from this release type: ident */
    /* Excluded from this release type: repository */
}

/**
 * Built-in extensions factory
 *
 * @returns Records of built-in compiler plugins
 *
 * @public
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
 * @returns Bud instance
 *
 * @public
 */
export declare function factory(overrides?: Bud.Options): Promise<Bud>;

/**
 * Hooks service
 *
 * @public
 */
declare class Hooks extends Hooks_2 implements Hooks_3, Service {
    /* Excluded from this release type: ident */
    /* Excluded from this release type: bootstrap */
}

/**
 * Peers service class
 *
 * @public
 */
declare class Peers implements Peers_2 {
    app: Framework;
    /**
     * Log helper
     *
     * @public
     */
    get log(): Service['log'];
    adjacents: AdjacencyList;
    hasMissingDependencies: boolean;
    modules: Record<string, Dependency>;
    peerDependencies: Map<string, string>;
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
    resolveModulePath(name: string): Promise<string>;
    /**
     * Returns manifest for a module from name (if findable)
     *
     * @public
     * @decorator `@bind`
     */
    getManifest(directoryPath: string): Promise<any>;
    /**
     * Plumbs project dependencies and gathers data
     * on bud related modules
     *
     * @public
     * @decorator `@bind`
     */
    discover(): Promise<this>;
    retrieveManifest(name: string): Promise<any>;
    collect(name: string): Promise<void>;
}

/**
 * Project service
 *
 * @public
 */
declare class Project extends Framework_2.Service implements Framework_2.Project {
    /* Excluded from this release type: ident */
    /**
     * Project peer dependencies manager
     *
     * @public
     */
    peers: Peers;
    /**
     * Repository values
     *
     * @public
     */
    repository: repository;
    /**
     * Path to profile.json reference file
     *
     * @public
     */
    get profilePath(): string;
    /* Excluded from this release type: bootstrap */
    /* Excluded from this release type: register */
    /* Excluded from this release type: boot */
    /**
     * Read project package.json and record peer dependencies
     *
     * @public
     * @decorator `@bind`
     */
    resolvePeers(): Promise<void>;
    /**
     * Read manifest from disk
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
 * Bud configuration defaults
 *
 * @public
 */
export declare const seed: Partial<Store.Repository>;

/**
 * Server service
 *
 * @public
 */
declare class Server extends Server_2 {
    /* Excluded from this release type: ident */
}

/* Excluded from this release type: services */

export { }
