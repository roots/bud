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
 * @packageDocumentation
 */

import * as Framework from '@roots/bud-framework';
import { Framework as Framework_2 } from '@roots/bud-framework';
import { FSWatcher } from 'chokidar';

/**
 * Server service class
 *
 * @public
 */
export declare class Server extends Framework.Service implements Framework.Server.Interface {
    /**
     * Express instance
     *
     * @public
     */
    application: Framework.Server.Application;
    /**
     * Server config accessor
     *
     * @public
     */
    get config(): Framework.Server.Configuration;
    /**
     * Express instance
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
     * Watcher instance
     *
     * @public
     */
    watcher: Watcher;
    /**
     * Port
     *
     * @public
     */
    get port(): string;
    /**
     * Service boot callback
     *
     * @public
     * @decorator `@bind`
     */
    boot(): Promise<void>;
    /**
     * {@inheritDoc @roots/bud-framework#Server.Interface.run}
     *
     * @public
     * @decorator `@bind`
     */
    run(): Promise<this>;
    compile(): Promise<void>;
    /**
     * App close handler
     *
     * @public
     * @decorator `@bind`
     */
    close(): void;
}

declare class Watcher {
    app: Framework_2;
    /**
     * Watcher instance
     *
     * @public
     */
    instance: FSWatcher;
    /**
     * Get watched files
     *
     * @public
     * @decorator `@bind`
     */
    getWatchedFiles(): Promise<Array<string>>;
    /**
     * Class constructor
     *
     * @param app - Application instance
     */
    constructor(app: Framework_2);
    /**
     * Initialize watch files
     *
     * @public
     * @decorator `@bind`
     */
    watch(): Promise<void>;
}

export { }
