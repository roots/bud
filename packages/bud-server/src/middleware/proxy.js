"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const zlib_1 = __importDefault(require("zlib"));
/**
 * Proxy middleware factory
 */
const proxy = (config) => {
    // Source host & proxy
    const source = {
        host: config.get('host'),
        port: config.get('port'),
    };
    // Proxy host & proxy
    const proxy = {
        host: config.get('proxy.host'),
        port: config.get('proxy.port'),
    };
    // Headers
    const headers = {
        'X-Powered-By': '@roots/bud',
        'X-Bud-Proxy-From': source.host,
        'X-Bud-Proxy-Secure': `${config.enabled('ssl')}`,
    };
    // Fabricate URL from provided options.
    const getUrl = (target) => {
        const protocol = config.enabled('ssl')
            ? 'https://'
            : 'http://';
        const hostname = /^[a-zA-Z]+:\/\//.test(target.host)
            ? target.host.replace(/^[a-zA-Z]+:\/\//, '')
            : target.host;
        const port = (port) => {
            return port !== 8000 || 443 ? `:${port}` : ``;
        };
        return `${protocol}${hostname}${port(target.port)}`;
    };
    /**
     * Rewrite hostname in body contents
     */
    const transformBody = (body) => body.replace(new RegExp(`${proxy.host}:${proxy.port}`, 'g'), `${source.host}:${source.port}`);
    /**
     * Proxy response handler.
     */
    const onProxyRes = (proxyRes, req, res) => {
        let body = Buffer.from([]);
        proxyRes.on('data', data => {
            body = Buffer.concat([body, data]);
        });
        proxyRes.on('end', () => {
            res.set(Object.assign(Object.assign(Object.assign({}, proxyRes.headers), { 'content-type': proxyRes.headers['content-type'] }), headers));
            /**
             * Handle gzipped responses
             */
            if (proxyRes.headers['content-encoding'] == 'gzip') {
                res.set({ 'content-encoding': 'gzip' });
                res.send(zlib_1.default.gzipSync(transformBody(zlib_1.default.gunzipSync(body).toString())));
            }
            else {
                // Not gzip
                res.send(Buffer.from(transformBody(body.toString())));
            }
            /**
             * Send response to client.
             */
            res.end();
        });
    };
    /**
     * Proxy middleware configuration
     */
    const proxyOptions = {
        autoRewrite: config.get('autoRewrite'),
        changeOrigin: config.get('changeOrigin'),
        cookieDomainRewrite: {
            [source.host]: proxy.host,
        },
        onProxyRes,
        selfHandleResponse: true,
        target: getUrl(proxy),
        headers,
        hostRewrite: `${source.host}:${source.port}`,
        logLevel: 'silent',
        ssl: config.enabled('ssl'),
        secure: config.enabled('ssl'),
        ws: config.enabled('ws'),
    };
    return http_proxy_middleware_1.createProxyMiddleware(proxyOptions);
};
exports.proxy = proxy;
//# sourceMappingURL=proxy.js.map