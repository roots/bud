import ProxyMiddleware from 'http-proxy-middleware';
import type { Server } from '@roots/bud-typings';
/**
 * Proxy middleware factory
 */
declare const proxy: (config: Server.Config) => ProxyMiddleware.RequestHandler;
export { proxy };
//# sourceMappingURL=proxy.d.ts.map