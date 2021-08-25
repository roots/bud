/**
 * @module @roots/bud-server
 */
import { Framework } from '@roots/bud-framework';
/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
declare type InjectClient = (app: Framework, injection: string[]) => void;
/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 */
declare const injectClient: InjectClient;
/**
 * @exports injectClient
 */
export { injectClient };
/**
 * @exports InjectClient
 */
export type { InjectClient };
//# sourceMappingURL=injectClient.d.ts.map