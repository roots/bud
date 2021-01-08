/// <reference types="webpack" />
import { Store, Webpack } from '@roots/bud-typings';
/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
export declare type InjectClient = (store: Store) => Webpack.Entry;
/**
 * Injects webpack.entry items with hot module scripts.
 */
export declare const injectClient: InjectClient;
//# sourceMappingURL=injectClient.d.ts.map