import { RequestHandler } from 'http-proxy-middleware';
import { ServerConfig } from '..';
/**
 * Proxy middleware factory
 */
declare const proxy: (config: ServerConfig) => RequestHandler;
export { proxy as default };
