/**
 * The {@link @roots/bud-cache#} package implements the {@link @roots/bud-framework#Cache | Cache interface}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation @betaDocumentation
 */

import * as Bud from '@roots/bud-framework';

/**
 * Cache service class
 *
 * @public
 */
declare class Cache_2 extends Bud.Cache.Abstract implements Bud.Cache.Interface {
    /**
     * True if cache is enabled
     *
     * @public
     */
    get enabled(): boolean;
    /**
     * Type
     *
     * @public
     */
    get type(): 'memory' | 'filesystem' | false;
    /**
     * @public
     */
    directory: string;
    /**
     * @public
     */
    version: string;
    /**
     * @public
     */
    boot(): Promise<void>;
    /**
     * @public
     */
    hashFileContents(): Promise<string>;
}
export { Cache_2 as Cache }

export { }
