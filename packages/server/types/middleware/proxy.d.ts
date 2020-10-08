import { RequestHandler } from 'http-proxy-middleware';
import Server from '..';
/**
 * Proxy middleware factory
 */
declare const proxy: (config: Server.Config) => RequestHandler;
export { proxy as default };
//# sourceMappingURL=proxy.d.ts.map