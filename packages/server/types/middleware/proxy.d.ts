import {RequestHandler} from 'http-proxy-middleware'
import type {Server} from '../Server'
/**
 * Proxy middleware factory
 */
declare const proxy: (config: Server.Config) => RequestHandler
export {proxy as default}
//# sourceMappingURL=proxy.d.ts.map
