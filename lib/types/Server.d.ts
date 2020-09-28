import { ServerInterface } from './';
declare class Server implements ServerInterface {
    instance: ServerInterface['instance'];
    config: ServerInterface['config'];
    compiler: ServerInterface['compiler'];
    constructor(compiler?: ServerInterface['compiler'], config?: ServerInterface['config']);
    getServer: ServerInterface['getServer'];
    setServer: ServerInterface['setServer'];
    getConfig: ServerInterface['getConfig'];
    setConfig: ServerInterface['setConfig'];
    getCompiler: ServerInterface['getCompiler'];
    setCompiler: ServerInterface['setCompiler'];
    addMiddleware: ServerInterface['addMiddleware'];
    addDevMiddleware: ServerInterface['addDevMiddleware'];
    addHotMiddleware: ServerInterface['addHotMiddleware'];
    addProxyMiddleware: ServerInterface['addProxyMiddleware'];
    listen: ServerInterface['listen'];
}
export { Server as default };
