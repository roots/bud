/**
 *  Development server features
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

/// <reference types="node" />

import * as Framework from '@roots/bud-framework';
import type { fs } from '@roots/bud-support';

/**
 * Server service class
 *
 * @public
 */
export declare class Server extends Framework.Service implements Framework.Server.Interface {
    /* Excluded from this release type: _assets */
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.application}
     *
     * @public
     */
    application: Framework.Server.Application;
    get config(): Framework.Server.Configuration;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface."instance"}
     *
     * @public
     */
    instance: Framework.Server.Instance;
    /**
     * Utilized middleware
     *
     * @public
     */
    middleware: Framework.Server.Middleware;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.watcher}
     *
     * @public
     */
    watcher: Watcher;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.assets}
     *
     * @public
     */
    get assets(): string[];
    /**
     * Register service event
     *
     * @public
     * @decorator `@bind`
     */
    register(): Promise<void>;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.getWatchedFilesArray}
     *
     * @public
     * @decorator `@bind`
     */
    getWatchedFiles(): Promise<Array<string>>;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.processMiddlewares}
     *
     * @public
     * @decorator `@bind`
     */
    processMiddlewares(): void;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.run}
     *
     * @public
     * @decorator `@bind`
     */
    run(): Promise<this>;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.inject}
     *
     * @public
     * @decorator `@bind`
     */
    inject(): void;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.inject}
     *
     * @public
     * @decorator `@bind`
     */
    close(): void;
}

declare type Watcher = fs.FSWatcher;

export { }
